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

import {
    InterchangeReachableStat,
    instanceOfInterchangeReachableStat,
    InterchangeReachableStatFromJSON,
    InterchangeReachableStatFromJSONTyped,
    InterchangeReachableStatToJSON,
} from './InterchangeReachableStat';
import {
    UnavailableStats,
    instanceOfUnavailableStats,
    UnavailableStatsFromJSON,
    UnavailableStatsFromJSONTyped,
    UnavailableStatsToJSON,
} from './UnavailableStats';

/**
 * @type LegStatsInterchangeReachableStat
 * Stat about interchange to following leg/trip being successful.
 * @export
 */
export type LegStatsInterchangeReachableStat = { status: 'available' } & InterchangeReachableStat | { status: 'unavailable' } & UnavailableStats;

export function LegStatsInterchangeReachableStatFromJSON(json: any): LegStatsInterchangeReachableStat {
    return LegStatsInterchangeReachableStatFromJSONTyped(json, false);
}

export function LegStatsInterchangeReachableStatFromJSONTyped(json: any, ignoreDiscriminator: boolean): LegStatsInterchangeReachableStat {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['status']) {
        case 'available':
            return {...InterchangeReachableStatFromJSONTyped(json, true), status: 'available'};
        case 'unavailable':
            return {...UnavailableStatsFromJSONTyped(json, true), status: 'unavailable'};
        default:
            throw new Error(`No variant of LegStatsInterchangeReachableStat exists with 'status=${json['status']}'`);
    }
}

export function LegStatsInterchangeReachableStatToJSON(value?: LegStatsInterchangeReachableStat | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['status']) {
        case 'available':
            return InterchangeReachableStatToJSON(value);
        case 'unavailable':
            return UnavailableStatsToJSON(value);
        default:
            throw new Error(`No variant of LegStatsInterchangeReachableStat exists with 'status=${value['status']}'`);
    }

}

