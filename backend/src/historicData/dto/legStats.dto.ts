import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsInstance } from "class-validator";
import { DelayStats } from "./delayStats.dto";
import { MaybeStats, UnavailableStats } from "./maybeStats.dto";

@ApiExtraModels(DelayStats, UnavailableStats)
export class LegStats {

  @ApiProperty({
    description: "Delay statistics at origin.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  originDelayStats: MaybeStats;

  @IsInstance(DelayStats)
  @ApiProperty({
    description: "Delay statistics at destination.",
    oneOf: [
      { $ref: getSchemaPath(DelayStats) },
      { $ref: getSchemaPath(UnavailableStats) }
    ],
    discriminator: {
      propertyName: "status",
      mapping: {
        "available": getSchemaPath(DelayStats),
        "unavailable": getSchemaPath(UnavailableStats)
      }
    },
    required: true
  })
  destinationDelayStats: MaybeStats;

  public constructor(
    originDelayStats: DelayStats,
    destinationDelayStats: DelayStats
  ) {
    this.originDelayStats = originDelayStats;
    this.destinationDelayStats = destinationDelayStats;
  }
}
