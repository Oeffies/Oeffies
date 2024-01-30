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
import type { DelayWithRoute } from './DelayWithRoute';
import {
    DelayWithRouteFromJSON,
    DelayWithRouteFromJSONTyped,
    DelayWithRouteToJSON,
} from './DelayWithRoute';

/**
 * 
 * @export
 * @interface Stats
 */
export interface Stats {
    /**
     * The most delayed trips
     * @type {Array<DelayWithRoute>}
     * @memberof Stats
     */
    delays: Array<DelayWithRoute>;
}

/**
 * Check if a given object implements the Stats interface.
 */
export function instanceOfStats(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "delays" in value;

    return isInstance;
}

export function StatsFromJSON(json: any): Stats {
    return StatsFromJSONTyped(json, false);
}

export function StatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Stats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'delays': ((json['delays'] as Array<any>).map(DelayWithRouteFromJSON)),
    };
}

export function StatsToJSON(value?: Stats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'delays': ((value.delays as Array<any>).map(DelayWithRouteToJSON)),
    };
}

