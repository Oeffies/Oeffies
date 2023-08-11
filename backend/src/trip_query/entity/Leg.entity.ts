import { ApiProperty } from "@nestjs/swagger";
import { JourneyLocation } from "./JourneyLocation.entity";
import { LegDetails } from "./LegDetails.entity";
import { Transportation } from "./Transportation.entity";


export class Leg {

  @ApiProperty({
    description: "(Full) Name of the location.",
    type: String
  })
  origin?: JourneyLocation;

  @ApiProperty({
    description: "Id of the location.",
    type: String
  })
  destination?: JourneyLocation;

  @ApiProperty({
    description: "Longitude of a location.",
    type: Transportation
  })
  transportation?: Transportation;

  @ApiProperty({
    description: "Type of the location.",
    type: LegDetails
  })
  details?: LegDetails;

  constructor(origin: JourneyLocation, destination: JourneyLocation, transportation: Transportation, details: LegDetails) {
    this.origin = origin;
    this.destination = destination;
    this.transportation = transportation;
    this.details = details;
  }

}


/* 
export interface Leg {
    coords?: Array<Array<any[] | CoordClass | number>>;
    destination?: JourneyLocationElement;
    distance?: number;
    duration?: number;
    elevationSummary?: ElevationSummary;
    fare?: LegFare;
    footPathInfo?: Array<any[] | boolean | FootPathInfoClass | number | number | null | string>;
    hints?: Info[];
    infos?: Info[];
    interchange?: Interchange;
    isRealtimeControlled?: boolean;
    origin?: JourneyLocationElement;
    pathDescriptions?: Array<any[] | boolean | PathDescriptionClass | number | number | null | string>;
    properties?: any[] | boolean | number | number | null | FluffyProperties | string;
    realtimeStatus?: RealtimeTripStatus[];
    stopSequence?: JourneyLocationElement[];
    transportation?: Transportation;
    vehicleAccess?: string[] | string;
}
*/
