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
 * @interface MaybeDelayStats
 */
export interface MaybeDelayStats {
    /**
     * Status of the leg stats.
     * @type {string}
     * @memberof MaybeDelayStats
     */
    status: MaybeDelayStatsStatusEnum;
}


/**
 * @export
 */
export const MaybeDelayStatsStatusEnum = {
    Available: 'available',
    Unavailable: 'unavailable'
} as const;
export type MaybeDelayStatsStatusEnum = typeof MaybeDelayStatsStatusEnum[keyof typeof MaybeDelayStatsStatusEnum];


/**
 * Check if a given object implements the MaybeDelayStats interface.
 */
export function instanceOfMaybeDelayStats(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function MaybeDelayStatsFromJSON(json: any): MaybeDelayStats {
    return MaybeDelayStatsFromJSONTyped(json, false);
}

export function MaybeDelayStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): MaybeDelayStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
    };
}

export function MaybeDelayStatsToJSON(value?: MaybeDelayStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
    };
}

