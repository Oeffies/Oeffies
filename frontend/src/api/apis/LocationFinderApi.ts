/* tslint:disable */
/* eslint-disable */
/**
 * NestJS Swagger
 * API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BadRequest,
  LocationCoordinatesDto,
  LocationNameDto,
  LocationWithAssignedStops,
  RatedLocation,
} from '../models/index';
import {
    BadRequestFromJSON,
    BadRequestToJSON,
    LocationCoordinatesDtoFromJSON,
    LocationCoordinatesDtoToJSON,
    LocationNameDtoFromJSON,
    LocationNameDtoToJSON,
    LocationWithAssignedStopsFromJSON,
    LocationWithAssignedStopsToJSON,
    RatedLocationFromJSON,
    RatedLocationToJSON,
} from '../models/index';

export interface LocationFinderControllerFindLocationIdsByNameRequest {
    locationNameDto: LocationNameDto;
}

export interface LocationFinderControllerFindLocationsAtCoordinatesRequest {
    locationCoordinatesDto: LocationCoordinatesDto;
}

export interface LocationFinderControllerFindLocationsByNameRequest {
    locationNameDto: LocationNameDto;
}

/**
 * 
 */
export class LocationFinderApi extends runtime.BaseAPI {

    /**
     * finds location ids by name
     */
    async locationFinderControllerFindLocationIdsByNameRaw(requestParameters: LocationFinderControllerFindLocationIdsByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters.locationNameDto === null || requestParameters.locationNameDto === undefined) {
            throw new runtime.RequiredError('locationNameDto','Required parameter requestParameters.locationNameDto was null or undefined when calling locationFinderControllerFindLocationIdsByName.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/location_finder/ids_by_name`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LocationNameDtoToJSON(requestParameters.locationNameDto),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * finds location ids by name
     */
    async locationFinderControllerFindLocationIdsByName(locationNameDto: LocationNameDto, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.locationFinderControllerFindLocationIdsByNameRaw({ locationNameDto: locationNameDto }, initOverrides);
        return await response.value();
    }

    /**
     * finds locations at given coordinates
     */
    async locationFinderControllerFindLocationsAtCoordinatesRaw(requestParameters: LocationFinderControllerFindLocationsAtCoordinatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LocationWithAssignedStops>> {
        if (requestParameters.locationCoordinatesDto === null || requestParameters.locationCoordinatesDto === undefined) {
            throw new runtime.RequiredError('locationCoordinatesDto','Required parameter requestParameters.locationCoordinatesDto was null or undefined when calling locationFinderControllerFindLocationsAtCoordinates.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/location_finder/at_coordinates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LocationCoordinatesDtoToJSON(requestParameters.locationCoordinatesDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LocationWithAssignedStopsFromJSON(jsonValue));
    }

    /**
     * finds locations at given coordinates
     */
    async locationFinderControllerFindLocationsAtCoordinates(locationCoordinatesDto: LocationCoordinatesDto, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LocationWithAssignedStops> {
        const response = await this.locationFinderControllerFindLocationsAtCoordinatesRaw({ locationCoordinatesDto: locationCoordinatesDto }, initOverrides);
        return await response.value();
    }

    /**
     * finds locations by name
     */
    async locationFinderControllerFindLocationsByNameRaw(requestParameters: LocationFinderControllerFindLocationsByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<RatedLocation>>> {
        if (requestParameters.locationNameDto === null || requestParameters.locationNameDto === undefined) {
            throw new runtime.RequiredError('locationNameDto','Required parameter requestParameters.locationNameDto was null or undefined when calling locationFinderControllerFindLocationsByName.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/location_finder/by_name`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LocationNameDtoToJSON(requestParameters.locationNameDto),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RatedLocationFromJSON));
    }

    /**
     * finds locations by name
     */
    async locationFinderControllerFindLocationsByName(locationNameDto: LocationNameDto, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<RatedLocation>> {
        const response = await this.locationFinderControllerFindLocationsByNameRaw({ locationNameDto: locationNameDto }, initOverrides);
        return await response.value();
    }

}
