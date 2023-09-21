import { Inject, Injectable } from "@nestjs/common";
import { StopFinderClient } from "@oeffis/vrr_client";
import { LocationCoordinatesDto } from "locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "locationFinder/dto/locationName.dto";
import { ApiService } from "vrr/service/api.service";
import { LocationWithAssignedStops, RatedLocation } from "../entity/location.entity";
import { VrrLocationWrapperService } from "./vrrLocationWrapper.service";

@Injectable()
export class LocationFinderService {

  private readonly locationFinder: StopFinderClient;
  private readonly locationWrapper: VrrLocationWrapperService;

  constructor(
    @Inject(VrrLocationWrapperService) locationWrapper: VrrLocationWrapperService,
    @Inject(ApiService) apiService: ApiService
  ) {
    this.locationFinder = apiService.getInstanceOf(StopFinderClient);
    this.locationWrapper = locationWrapper;
  }

  async findLocationsByCoordinates(query: LocationCoordinatesDto): Promise<LocationWithAssignedStops> {
    const response = await this.locationFinder.findStopAtCoordinates({
      latitude: query.latitude,
      longitude: query.longitude
    });

    return this.locationWrapper.wrap(response.locations ?? []);
  }

  async findLocationsByName(query: LocationNameDto): Promise<RatedLocation[]> {
    const response = await this.locationFinder.findStopByNameOrId({
      search: query.name,
      limit: query.limit
    });

    return this.locationWrapper.wrap(response.locations ?? []);
  }

  async findLocationIdsByNameOrId(query: LocationNameDto): Promise<string[]> {
    const response = await this.locationFinder.findStopByNameOrId({
      search: query.name,
      limit: query.limit
    });

    return response.locations?.map(location => location.id) as string[] | undefined ?? [];
  }

}
