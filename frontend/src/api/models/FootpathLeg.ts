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
import type { Footpath } from './Footpath';
import {
    FootpathFromJSON,
    FootpathFromJSONTyped,
    FootpathToJSON,
} from './Footpath';
import type { LegDestinationLocation } from './LegDestinationLocation';
import {
    LegDestinationLocationFromJSON,
    LegDestinationLocationFromJSONTyped,
    LegDestinationLocationToJSON,
} from './LegDestinationLocation';
import type { LegDetails } from './LegDetails';
import {
    LegDetailsFromJSON,
    LegDetailsFromJSONTyped,
    LegDetailsToJSON,
} from './LegDetails';
import type { LegOriginLocation } from './LegOriginLocation';
import {
    LegOriginLocationFromJSON,
    LegOriginLocationFromJSONTyped,
    LegOriginLocationToJSON,
} from './LegOriginLocation';

/**
 * 
 * @export
 * @interface FootpathLeg
 */
export interface FootpathLeg {
    /**
     * 
     * @type {LegOriginLocation}
     * @memberof FootpathLeg
     */
    origin: LegOriginLocation;
    /**
     * 
     * @type {LegDestinationLocation}
     * @memberof FootpathLeg
     */
    destination: LegDestinationLocation;
    /**
     * 
     * @type {LegDetails}
     * @memberof FootpathLeg
     */
    details: LegDetails;
    /**
     * Type of the leg.
     * @type {string}
     * @memberof FootpathLeg
     */
    type: FootpathLegTypeEnum;
    /**
     * 
     * @type {Footpath}
     * @memberof FootpathLeg
     */
    footpath: Footpath;
}


/**
 * @export
 */
export const FootpathLegTypeEnum = {
    Transportation: 'transportation',
    Footpath: 'footpath'
} as const;
export type FootpathLegTypeEnum = typeof FootpathLegTypeEnum[keyof typeof FootpathLegTypeEnum];


/**
 * Check if a given object implements the FootpathLeg interface.
 */
export function instanceOfFootpathLeg(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "origin" in value;
    isInstance = isInstance && "destination" in value;
    isInstance = isInstance && "details" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "footpath" in value;

    return isInstance;
}

export function FootpathLegFromJSON(json: any): FootpathLeg {
    return FootpathLegFromJSONTyped(json, false);
}

export function FootpathLegFromJSONTyped(json: any, ignoreDiscriminator: boolean): FootpathLeg {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'origin': LegOriginLocationFromJSON(json['origin']),
        'destination': LegDestinationLocationFromJSON(json['destination']),
        'details': LegDetailsFromJSON(json['details']),
        'type': json['type'],
        'footpath': FootpathFromJSON(json['footpath']),
    };
}

export function FootpathLegToJSON(value?: FootpathLeg | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'origin': LegOriginLocationToJSON(value.origin),
        'destination': LegDestinationLocationToJSON(value.destination),
        'details': LegDetailsToJSON(value.details),
        'type': value.type,
        'footpath': FootpathToJSON(value.footpath),
    };
}

