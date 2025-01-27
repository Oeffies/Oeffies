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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LocationCoordinatesDto
 */
export interface LocationCoordinatesDto {
    /**
     * Latitude of the location.
     * @type {number}
     * @memberof LocationCoordinatesDto
     */
    latitude: number;
    /**
     * Longitude of the location.
     * @type {number}
     * @memberof LocationCoordinatesDto
     */
    longitude: number;
}

/**
 * Check if a given object implements the LocationCoordinatesDto interface.
 */
export function instanceOfLocationCoordinatesDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "latitude" in value;
    isInstance = isInstance && "longitude" in value;

    return isInstance;
}

export function LocationCoordinatesDtoFromJSON(json: any): LocationCoordinatesDto {
    return LocationCoordinatesDtoFromJSONTyped(json, false);
}

export function LocationCoordinatesDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationCoordinatesDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': json['latitude'],
        'longitude': json['longitude'],
    };
}

export function LocationCoordinatesDtoToJSON(value?: LocationCoordinatesDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latitude': value.latitude,
        'longitude': value.longitude,
    };
}

