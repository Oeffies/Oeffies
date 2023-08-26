import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { LocationCoordinatesDto } from "locationFinder/dto/locationCoordinates.dto";
import { LocationNameDto } from "locationFinder/dto/locationName.dto";
import { Location } from "../entity/location.entity";
import { LocationFinderService } from "../service/locationFinder.service";

@Controller("location_finder")
@ApiTags("location_finder")
export class LocationFinderController {
  constructor(private readonly locationFinderService: LocationFinderService) { }

  @Post("at_coordinates")
  @ApiOperation({
    summary: "finds a stop at given coordinates"
  })
  @ApiOkResponse({
    description: "Returns the found locations.",
    type: [Location]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findStopsAtCoordinates(@Body() query: LocationCoordinatesDto): Promise<Location[]> {
    return this.locationFinderService.findLocationsByCoordinates(query);
  }

  @Post("by_name")
  @ApiOperation({
    summary: "finds a stop by name"
  })
  @ApiOkResponse({
    description: "Returns the found locations.",
    type: [Location]
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  async findStopByName(@Body() query: LocationNameDto): Promise<Location[]> {
    return this.locationFinderService.findLocationsByName(query);
  }
}