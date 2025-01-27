import React, { createContext, useContext } from "react";
import { Configuration, JourneyApi, LocationFinderApi, StatsApi } from "../../api";
import { useAppConfig } from "../config/AppConfigContext";

export interface ApiClients {
  journeyApi: JourneyApi;
  locationFinderApi: LocationFinderApi;
  statsApi: StatsApi;
}

export const ApiClientsContext = createContext<ApiClients | null>(null);

export function ApiClientsProvider(props: { children: React.ReactNode }): JSX.Element {
  const { apiUrl } = useAppConfig();

  const configuration = new Configuration({ basePath: apiUrl });

  const apiClients: ApiClients = {
    journeyApi: new JourneyApi(configuration),
    locationFinderApi: new LocationFinderApi(configuration),
    statsApi: new StatsApi(configuration)
  };

  return (
    <ApiClientsContext.Provider value={apiClients}>
      {props.children}
    </ApiClientsContext.Provider>
  );
}

export function useApiClients(): ApiClients {
  const context = useContext(ApiClientsContext);
  if (!context) {
    throw new Error("useApiClients must be used within a ApiClientsProvider");
  }

  return context;
}

export function useJourneyApi(): JourneyApi {
  const { journeyApi } = useApiClients();
  return journeyApi;
}

export function useLocationFinderApi(): LocationFinderApi {
  const { locationFinderApi } = useApiClients();
  return locationFinderApi;
}

export function useStatsApi(): StatsApi {
  const { statsApi } = useApiClients();
  return statsApi;
}
