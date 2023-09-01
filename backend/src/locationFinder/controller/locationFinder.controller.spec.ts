import { Test, TestingModule } from "@nestjs/testing";
import { LocationFinderModule } from "locationFinder/locationFinder.module";
import { LocationType } from "vrr/entity/locationType.entity";
import { Location } from "../entity/location.entity";
import { LocationFinderService } from "../service/locationFinder.service";
import { LocationFinderController } from "./locationFinder.controller";

let locationFinderController: LocationFinderController;
let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    imports: [LocationFinderModule]
  }).compile();

  locationFinderController = app.get<LocationFinderController>(LocationFinderController);
});

it("finds stops by coordinates", async () => {
  const mockedLocations = [location("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0")];
  vi.spyOn(app.get(LocationFinderService), "findLocationsByCoordinates").mockResolvedValue(mockedLocations);
  const requestBody = {
    "latitude": 51.50598042775682,
    "longitude": 7.101082448485377
  };

  const response = await locationFinderController.findLocationsAtCoordinates(requestBody);

  expect(response).toEqual(mockedLocations);
});

it("finds stops by names", async () => {
  const mockedLocations = [
    location("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0"),
    location("poiID:70667:5513000:-1:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:ANY:POI:790425:5288652:MRCV:nrw"),
    location("poiID:70666:5513000:-1:Gelsenkirchen Hauptbahnhof Südausgang:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Südausgang:ANY:POI:790698:5288992:MRCV:nrw"),
    location("poiID:65953:5513000:-1:Parkhaus Hauptbahnhof-Süd:Gelsenkirchen:Parkhaus Hauptbahnhof-Süd:ANY:POI:790858:5288938:MRCV:nrw"),
    location("poiID:71952:5513000:-1:Hauptbahnhof Parkhaus:Gelsenkirchen:Hauptbahnhof Parkhaus:ANY:POI:790652:5288935:MRCV:nrw"),
    location("de:05513:5613")
  ];
  vi.spyOn(app.get(LocationFinderService), "findLocationsByName").mockResolvedValue(mockedLocations);
  const requestBody = {
    "name": "Gelsenkirchen Hbf"
  };

  const response = await locationFinderController.findLocationsByName(requestBody);
  expect(response).toEqual(mockedLocations);
});

function location(id: string): Location {
  return {
    "id": id,
    "name": "Gelsenkirchen Hbf",
    "type": LocationType.stop,
    "details": {
      "shortName": "Hbf",
      "parent": undefined,
      "latitude": 51.506,
      "longitude": 7.101
    }
  };
}
