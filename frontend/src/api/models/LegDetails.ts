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
import type { LegInfo } from './LegInfo';
import {
    LegInfoFromJSON,
    LegInfoFromJSONTyped,
    LegInfoToJSON,
} from './LegInfo';

/**
 * 
 * @export
 * @interface LegDetails
 */
export interface LegDetails {
    /**
     * Distance of leg in meter?
     * @type {number}
     * @memberof LegDetails
     */
    distance?: number;
    /**
     * Duration of leg in seconds.
     * @type {number}
     * @memberof LegDetails
     */
    duration?: number;
    /**
     * Leg information.
     * @type {Array<LegInfo>}
     * @memberof LegDetails
     */
    infos?: Array<LegInfo>;
    /**
     * Leg hints.
     * @type {Array<LegInfo>}
     * @memberof LegDetails
     */
    hints?: Array<LegInfo>;
    /**
     * Leg real time status.
     * @type {Array<string>}
     * @memberof LegDetails
     */
    realtimeTripStatus?: Array<LegDetailsRealtimeTripStatusEnum>;
}


/**
 * @export
 */
export const LegDetailsRealtimeTripStatusEnum = {
    Deviation: 'DEVIATION',
    ExtraStops: 'EXTRA_STOPS',
    ExtraTrip: 'EXTRA_TRIP',
    Monitored: 'MONITORED',
    OutsideRealtimeWindow: 'OUTSIDE_REALTIME_WINDOW',
    PrognosisImpossible: 'PROGNOSIS_IMPOSSIBLE',
    RealtimeOnlyInformative: 'REALTIME_ONLY_INFORMATIVE',
    TripCancelled: 'TRIP_CANCELLED'
} as const;
export type LegDetailsRealtimeTripStatusEnum = typeof LegDetailsRealtimeTripStatusEnum[keyof typeof LegDetailsRealtimeTripStatusEnum];


/**
 * Check if a given object implements the LegDetails interface.
 */
export function instanceOfLegDetails(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LegDetailsFromJSON(json: any): LegDetails {
    return LegDetailsFromJSONTyped(json, false);
}

export function LegDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LegDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'distance': !exists(json, 'distance') ? undefined : json['distance'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'infos': !exists(json, 'infos') ? undefined : ((json['infos'] as Array<any>).map(LegInfoFromJSON)),
        'hints': !exists(json, 'hints') ? undefined : ((json['hints'] as Array<any>).map(LegInfoFromJSON)),
        'realtimeTripStatus': !exists(json, 'realtimeTripStatus') ? undefined : json['realtimeTripStatus'],
    };
}

export function LegDetailsToJSON(value?: LegDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'distance': value.distance,
        'duration': value.duration,
        'infos': value.infos === undefined ? undefined : ((value.infos as Array<any>).map(LegInfoToJSON)),
        'hints': value.hints === undefined ? undefined : ((value.hints as Array<any>).map(LegInfoToJSON)),
        'realtimeTripStatus': value.realtimeTripStatus,
    };
}

