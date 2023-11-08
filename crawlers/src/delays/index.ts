import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client/dist/Constants";
import { DeparturesClient } from "@oeffis/vrr_client/dist/DeparturesClient";
import { SCHEMA_CONVERTER_CONFIG, SystemMessageError } from "@oeffis/vrr_client/dist/VrrClientBase";
import { StopEvent } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import * as BetterQueue from "better-queue";
import { addSeconds, differenceInSeconds, formatDuration, intervalToDuration } from "date-fns";
import { WithPgConnection, createPgPool } from "../postgres/createPgPool";

export async function run(args: { stopId?: string, limit: number }): Promise<void> {
  SCHEMA_CONVERTER_CONFIG.logSchemaErrors = false;

  const pgPool = await createPgPool({
    host: process.env.pgHost,
    port: parseInt(process.env.pgPort ?? "5432"),
    database: process.env.pgDatabase ?? "postgres",
    user: process.env.pgUser ?? "postgres",
    password: process.env.pgPassword ?? "postgres"
  }, console.log);

  const vrrTimetableVersionId = await getLatestVrrTimetableVersionId(pgPool.withPgConnection);
  console.log("latest vrr timetable version id", vrrTimetableVersionId);

  const stopIds = args.stopId ? [args.stopId] : await getStopIdsFromDb(pgPool.withPgConnection, vrrTimetableVersionId);
  console.log("found", stopIds.length, "definitive stop ids");

  const processingQueue = new BetterQueue({
    process: (task: { id: string }, cb) => {
      processOneStopId(args.limit, task.id, vrrTimetableVersionId, pgPool.withPgConnection)
        .then(() => cb(null))
        .catch(cb);
    },
    concurrent: 100
  });

  for (const stopId of stopIds) {
    processingQueue.push({ id: stopId });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processingQueue.on("task_failed", (taskId: any, err: any, stats: any) => {
    console.error("task failed", { taskId, err, stats });
  });

  const startTime = new Date();
  const timer = setInterval(() => {
    const finished = processingQueue.getStats().total;
    const total = stopIds.length;
    const remaining = total - finished;

    const elapsed = differenceInSeconds(new Date(), startTime);
    const remainingTime = elapsed / finished * remaining;
    const remainingDuration = intervalToDuration({
      start: new Date(),
      end: addSeconds(new Date(), remainingTime)
    });

    const formattedRemainingTime = formatDuration(remainingDuration);
    console.log(`Finished ${finished} of ${total} stops. ${remaining} remaining. ${formattedRemainingTime} remaining`);
  }, 5_000);

  await promiseOfQueueDrained(processingQueue);
  clearInterval(timer);

  await pgPool.closePgConnection();
}

async function processOneStopId(limit: number, stopId: string, vrrTimetableVersionId: number, withPgConnection: WithPgConnection): Promise<void> {
  const recordingTime = new Date();
  const stopEvents = await getDepartureDelays(stopId, limit);
  await insertDepartureDelaysIntoDb(stopEvents, withPgConnection, recordingTime, vrrTimetableVersionId);
}

async function getStopIdsFromDb(withPgConnection: WithPgConnection, vrrTimetableVersionId: number): Promise<string[]> {
  return withPgConnection(async pgClient => {
    const stopIds = await pgClient.query(`
    WITH RECURSIVE ParentHierarchy AS (
      SELECT stop_id, parent_station
      FROM stops
      WHERE stop_id IN (
        SELECT DISTINCT stop_id FROM stop_times WHERE vrr_timetable_version_id = $1
      )
      UNION
      SELECT t.stop_id, t.parent_station
      FROM stops t
      INNER JOIN ParentHierarchy ph ON t.stop_id = ph.parent_station
    ),
    valid_stops AS (
        SELECT stop_id FROM ParentHierarchy WHERE parent_station IS NULL
    )

    SELECT stop_id
    FROM stops
    WHERE "NVBW_HST_DHID" LIKE 'de:%' AND
      stop_id IN (
        SELECT stop_id FROM valid_stops
      )`, [vrrTimetableVersionId]);

    if (stopIds.rowCount === 0) {
      return Promise.reject(new Error("no stops with stop times found in DB"));
    }

    return stopIds.rows.map(row => row.stop_id);
  });
}

async function getLatestVrrTimetableVersionId(withPgConnection: WithPgConnection): Promise<number> {
  return withPgConnection(async pgClient => {
    const result = await pgClient.query("SELECT max(vrr_timetable_version_id) as id FROM vrr_timetable_version");
    if (result.rowCount === 0) {
      throw new Error("no vrr timetable versions found in DB");
    }
    return result.rows[0].id;
  });
}

async function getDepartureDelays(stopId: string, limit: number): Promise<StopEvent[]> {
  try {
    const departures = await new DeparturesClient(VRR_TEST_API_BASE_URL)
      .findDeparturesByStop({ stopId, limit });

    const departureEvents = departures.stopEvents ?? [];
    return departureEvents;

  } catch (e) {
    if (e instanceof SystemMessageError) {
      const ignored = [
        "no matching departure found",
        "no serving lines found"
      ];

      if (e.systemMessages.length === 1) {
        const messageText = e.systemMessages[0].text;
        if (typeof messageText === "string" && ignored.includes(messageText)) {
          return [];
        }
      }
    }

    throw e;
  }
}

async function insertDepartureDelaysIntoDb(stopEvents: StopEvent[], withPgConnection: WithPgConnection, recordingTime: Date, vrrTimetableVersionId: number): Promise<void> {
  await withPgConnection(async pgClient => {
    const promises = stopEvents.map(stop => pgClient.query("INSERT INTO historic_data (trip_id, stop_id, recording_time, is_departure, planned, estimated, raw_data, vrr_timetable_version_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
      stop.transportation.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      stop.location!.id,
      recordingTime,
      true,
      stop.departureTimePlanned,
      stop.departureTimeEstimated,
      JSON.stringify(stop),
      vrrTimetableVersionId
    ]));

    await Promise.all(promises);
  });
}

function promiseOfQueueDrained(queue: BetterQueue): Promise<void> {
  return new Promise((resolve, reject) => {
    queue.once("drain", () => resolve());
    queue.once("error", (err) => reject(err));
  });
}
