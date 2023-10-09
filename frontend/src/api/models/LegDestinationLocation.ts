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
import type { LocationDetails } from './LocationDetails';
import {
    LocationDetailsFromJSON,
    LocationDetailsFromJSONTyped,
    LocationDetailsToJSON,
} from './LocationDetails';

/**
 * 
 * @export
 * @interface LegDestinationLocation
 */
export interface LegDestinationLocation {
    /**
     * Id of the location.
     * @type {string}
     * @memberof LegDestinationLocation
     */
    id: string;
    /**
     * (Full) Name of the location.
     * @type {string}
     * @memberof LegDestinationLocation
     */
    name: string;
    /**
     * Type of the location.
     * @type {string}
     * @memberof LegDestinationLocation
     */
    type: LegDestinationLocationTypeEnum;
    /**
     * 
     * @type {LocationDetails}
     * @memberof LegDestinationLocation
     */
    details: LocationDetails;
    /**
     * Planned arrival time. If there is no specific arrival time, departure time gets duplicated.
     * @type {Date}
     * @memberof LegDestinationLocation
     */
    arrivalTimePlanned: Date;
    /**
     * Estimated arrival time. If there is no estimated arrival time, planned arrival time gets duplicated.
     * @type {Date}
     * @memberof LegDestinationLocation
     */
    arrivalTimeEstimated: Date;
}


/**
 * @export
 */
export const LegDestinationLocationTypeEnum = {
    Address: 'address',
    Crossing: 'crossing',
    Gis: 'gis',
    Locality: 'locality',
    Parking: 'parking',
    Platform: 'platform',
    Poi: 'poi',
    PoiHierarchy: 'poiHierarchy',
    Sharing: 'sharing',
    Stop: 'stop',
    Street: 'street',
    Suburb: 'suburb',
    Unknown: 'unknown',
    Singlehouse: 'singlehouse'
} as const;
export type LegDestinationLocationTypeEnum = typeof LegDestinationLocationTypeEnum[keyof typeof LegDestinationLocationTypeEnum];


/**
 * Check if a given object implements the LegDestinationLocation interface.
 */
export function instanceOfLegDestinationLocation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "details" in value;
    isInstance = isInstance && "arrivalTimePlanned" in value;
    isInstance = isInstance && "arrivalTimeEstimated" in value;

    return isInstance;
}

export function LegDestinationLocationFromJSON(json: any): LegDestinationLocation {
    return LegDestinationLocationFromJSONTyped(json, false);
}

export function LegDestinationLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): LegDestinationLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'type': json['type'],
        'details': LocationDetailsFromJSON(json['details']),
        'arrivalTimePlanned': (new Date(json['arrivalTimePlanned'])),
        'arrivalTimeEstimated': (new Date(json['arrivalTimeEstimated'])),
    };
}

export function LegDestinationLocationToJSON(value?: LegDestinationLocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'type': value.type,
        'details': LocationDetailsToJSON(value.details),
        'arrivalTimePlanned': (value.arrivalTimePlanned.toISOString()),
        'arrivalTimeEstimated': (value.arrivalTimeEstimated.toISOString()),
    };
}

