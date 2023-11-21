import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import greenBusIcon from "../../../src/images/bus-green-map-marker.svg";
import redBusIcon from "../../../src/images/bus-red-map-marker.svg";
import whiteBusIcon from "../../../src/images/bus-white-map-marker.svg";
import greenLocationIcon from "../../../src/images/location-green-map-marker.svg";
import redLocationIcon from "../../../src/images/location-red-map-marker.svg";
import whiteLocationIcon from "../../../src/images/location-white-map-marker.svg";
import markerShadow from "../../../src/images/marker-shadow.png";
import greenPinIcon from "../../../src/images/pin-green-map-marker.svg";
import redPinIcon from "../../../src/images/pin-red-map-marker.svg";
import whitePinIcon from "../../../src/images/pin-white-map-marker.svg";
import currentPositionIcon from "../../../src/images/position-map-marker.svg";

import { Location, LocationTypeEnum } from "../../api";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";

export interface MarkerProps {
  origin?: Location,
  destination?: Location,
  location: Location,
  onItemClicked?: (location: Location) => void
}

const MapMarker = ({ origin, destination, location, onItemClicked }: MarkerProps): JSX.Element => {

  const getOriginIcon = (type: LocationTypeEnum): string => {
    let icon: string = currentPositionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Unknown) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = whiteBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = whitePinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = whitePinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = whiteBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = whiteLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPositionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPositionIcon;
    }

    return icon;
  };

  const getDestinationIcon = (type: LocationTypeEnum): string => {
    let icon: string = currentPositionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Unknown) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = redBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = redPinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = redPinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = redBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = redLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPositionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPositionIcon;
    }

    return icon;
  };

  const getLocationIcon = (type: LocationTypeEnum): string => {
    let icon: string = currentPositionIcon;

    if (type === LocationTypeEnum.Address) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Unknown) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Crossing) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Gis) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Locality) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Platform) {
      icon = greenBusIcon;
    }
    if (type === LocationTypeEnum.Poi) {
      icon = greenPinIcon;
    }
    if (type === LocationTypeEnum.PoiHierarchy) {
      icon = greenPinIcon;
    }
    if (type === LocationTypeEnum.Sharing) {
      icon = currentPositionIcon;
    }
    if (type === LocationTypeEnum.Stop) {
      icon = greenBusIcon;
    }
    if (type === LocationTypeEnum.Street) {
      icon = greenLocationIcon;
    }
    if (type === LocationTypeEnum.Suburb) {
      icon = currentPositionIcon;
    }
    // not present in vrr spec
    if (type === LocationTypeEnum.Singlehouse) {
      icon = currentPositionIcon;
    }

    return icon;
  };

  const createMarker = (): JSX.Element => {

    let mapMarker: JSX.Element = <></>;

    let icon = null;
    let text = "";

    if (origin?.name === location.name) {
      text = "Start";
      icon = new Icon({
        iconUrl: getOriginIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });
    } else if (destination?.name === location.name) {
      text = "Ziel";
      icon = new Icon({
        iconUrl: getDestinationIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });
    } else {
      icon = new Icon({
        iconUrl: getLocationIcon(location.type),
        iconSize: [25, 41],
        iconAnchor: [12.5, 38],
        shadowUrl: markerShadow,
        shadowAnchor: [12.5, 38],
        popupAnchor: [0, -32]
      });
    }

    let locationName = location.name.split(",");

    mapMarker = (
      <Marker position={[location.details.coordinates.latitude, location.details.coordinates.longitude]}
        icon={icon}>
        <Popup className="popup">
          <p className="popupHeadline">{locationName[0]}</p><br />
          <p className="popupText">{locationName[1]}</p><br />
          <p className="popupText">
            <i>{text}</i>
          </p>
          {onItemClicked !== undefined
            ? <p className="selectLocation" onClick={() => onItemClicked(location)}>Auswählen</p>
            : <></>}
        </Popup>
      </Marker>
    );

    return mapMarker;
  };

  return (createMarker());
};

export default MapMarker;

export const CurrentLocationMapMarker: React.FC = () => {
  const currentLocation = useCurrentLocation();
  if (currentLocation.state !== "located") {

    return <></>;
  }

  const currentLocationIcon = new Icon({
    iconUrl: currentPositionIcon,
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    shadowUrl: markerShadow,
    shadowAnchor: [0, 20],
    popupAnchor: [10, 0]
  });

  return (
    <Marker
      position={[currentLocation.location.coords.latitude, currentLocation.location.coords.longitude]}
      icon={currentLocationIcon}>
      <Popup className="popup" >
        <p className="popupHeadline">Your position</p>
      </Popup >
    </Marker >
  );
};
