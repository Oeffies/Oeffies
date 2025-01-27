import { useEffect, useState } from "react";
import { Location, RatedLocation } from "../api";
import { useLocationFinderApi } from "../services/apiClients/ApiClientsContext";

const locationCache = new Map<string, Location>();

export function useLocationByIdOrNull(locationId: string | null): Location | null {
  const locationFinderApi = useLocationFinderApi();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (locationId === null) { setLocation(null); return; }

    const cachedLocation = locationCache.get(locationId);
    if (cachedLocation) {
      setLocation(cachedLocation); return;
    }

    locationFinderApi
      .locationFinderControllerFindLocationsByName(
        { name: locationId },
        { signal: abortController.signal }
      )
      .then(processLocationResult, processLocationFailure);

    function processLocationResult(matchingLocations: RatedLocation[]): void {
      isAborted()
        || checkNoLocationFound(matchingLocations)
        || checkMultipleLocationsFound(matchingLocations)
        || processSingleLocationFound(matchingLocations);
    }

    function isAborted(): boolean {
      return abortController.signal.aborted;
    }

    function checkNoLocationFound(matchingLocations: RatedLocation[]): boolean {
      if (matchingLocations.length !== 0) return false;
      console.warn(`No location found with id ${locationId}`);
      return true;
    }

    function checkMultipleLocationsFound(matchingLocations: Location[]): boolean {
      if (matchingLocations.length <= 1) return false;
      console.warn(`Multiple locations found with id ${locationId}`);
      return true;
    }

    function processSingleLocationFound(matchingLocations: RatedLocation[]): true {
      const location = matchingLocations[0] as Location;
      locationCache.set(location.id, location);
      setLocation(location);
      return true;
    }

    function processLocationFailure(error: Error): void {
      if (abortController.signal.aborted) return;
      console.error(`Failed to find location with id ${locationId}`, error);
      error.cause && console.error(error.cause);
    }

    return () => { abortController.abort(); };
  }, [locationFinderApi, locationCache, locationId]);

  return location;
}
