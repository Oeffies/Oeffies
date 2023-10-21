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
 * @interface TransportationDestination
 */
export interface TransportationDestination {
    /**
     * Id of the location.
     * @type {string}
     * @memberof TransportationDestination
     */
    id: string;
    /**
     * (Full) Name of the location.
     * @type {string}
     * @memberof TransportationDestination
     */
    name: string;
    /**
     * Type of the location.
     * @type {string}
     * @memberof TransportationDestination
     */
    type: TransportationDestinationTypeEnum;
}


/**
 * @export
 */
export const TransportationDestinationTypeEnum = {
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
export type TransportationDestinationTypeEnum = typeof TransportationDestinationTypeEnum[keyof typeof TransportationDestinationTypeEnum];


/**
 * Check if a given object implements the TransportationDestination interface.
 */
export function instanceOfTransportationDestination(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function TransportationDestinationFromJSON(json: any): TransportationDestination {
    return TransportationDestinationFromJSONTyped(json, false);
}

export function TransportationDestinationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransportationDestination {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'type': json['type'],
    };
}

export function TransportationDestinationToJSON(value?: TransportationDestination | null): any {
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
    };
}

