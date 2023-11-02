import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactElement, useEffect, useState } from "react";
import { Polygon, TileLayer } from "react-leaflet";
import { Location } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useMultipleLocationsByIdOrNull } from "../../hooks/useMultipleLocationsByIdOrNull";
import "./LeafletMapContainer.css";
import MapMarker, { CurrentLocationMapMarker } from "./MapMarker";
import ReactiveMapContainer, { View } from "./ReactiveMapContainer";

export interface MapProps {
  origin?: Location,
  destination?: Location,
  locationIds: string[],
  showLines: boolean,
  onItemClicked?: (location: Location) => void
}

const LeafletMapContainer = ({ origin, destination, locationIds, showLines, onItemClicked }: MapProps): JSX.Element => {
  const locations = useMultipleLocationsByIdOrNull(locationIds);
  const usersPosition = useCurrentLocation();
  const [view, setView] = useState<View>({ bounds: [[50.30527, 5.71687], [52.69499, 9.47241]] });

  useEffect(() => {
    if (usersPosition.state === "located") {
      const lat = usersPosition.location.coords.latitude;
      const lng = usersPosition.location.coords.longitude;

      setView({ center: [lat, lng], zoom: 15 });
    }
  }, [usersPosition]);

  const getLocationsCoords = (): LatLngTuple[] => locations
    .map((location) => [location.details.coordinates.latitude, location.details.coordinates.longitude]);

  const renderMarker = (): ReactElement[] => locations.map((location, index) => <MapMarker key={"marker" + index} origin={origin} destination={destination} location={location} onItemClicked={onItemClicked} />);

  const getPolygonPositions = getLocationsCoords;

  return <ReactiveMapContainer
    style={{ height: "100%", width: "100%" }}
    view={view}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {renderMarker()}
    {<CurrentLocationMapMarker />}
    {showLines
      ? <Polygon color={"rgb(77, 77, 77)"} opacity={1} dashArray={"20,15"} weight={2} positions={getPolygonPositions()} />
      : <></>}
  </ReactiveMapContainer>;
};

export default LeafletMapContainer;
