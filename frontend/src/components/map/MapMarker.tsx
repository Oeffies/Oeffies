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
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useDestinationId, useOriginId } from "../../services/locations/originDestinationContext";

export interface MarkerProps {
  location: Location,
  onItemClicked?: (location: Location) => void
}

const MapMarker = ({ location, onItemClicked }: MarkerProps): JSX.Element => {
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

  const icon = new Icon({
    iconUrl: getLocationIcon(location.type),
    iconSize: [25, 41],
    iconAnchor: [12.5, 38],
    shadowUrl: markerShadow,
    shadowAnchor: [12.5, 38],
    popupAnchor: [0, -32]
  });

  const text = "";
  const locationName = location.name.split(",");

  return <Marker position={[location.details.coordinates.latitude, location.details.coordinates.longitude]}
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
  </Marker>;
};

export default MapMarker;

export const OriginMapMarker: React.FC<{ onItemClicked?: (location: Location) => void }> = ({ onItemClicked }) => {
  const [originId] = useOriginId();
  const location = useLocationByIdOrNull(originId);

  if (location === null) {
    return <></>;
  }
  const text = "Start";
  const icon = new Icon({
    iconUrl: getOriginIcon(location.type),
    iconSize: [25, 41],
    iconAnchor: [12.5, 38],
    shadowUrl: markerShadow,
    shadowAnchor: [12.5, 38],
    popupAnchor: [0, -32]
  });

  const locationName = location.name.split(",");
  return (
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
};

function getOriginIcon(type: string): string {
  switch (type) {
    case LocationTypeEnum.Address:
    case LocationTypeEnum.Unknown:
    case LocationTypeEnum.Crossing:
    case LocationTypeEnum.Street:
      return whiteLocationIcon;
    case LocationTypeEnum.Platform:
    case LocationTypeEnum.Stop:
      return whiteBusIcon;
    case LocationTypeEnum.Poi:
    case LocationTypeEnum.PoiHierarchy:
      return whitePinIcon;
    case LocationTypeEnum.Gis:
    case LocationTypeEnum.Locality:
    case LocationTypeEnum.Sharing:
    case LocationTypeEnum.Suburb:
    case LocationTypeEnum.Singlehouse:
    default:
      return currentPositionIcon;
  }
}

export const DestinationMapMarker: React.FC<{ onItemClicked?: (location: Location) => void }> = ({ onItemClicked }) => {
  const [destinationId] = useDestinationId();
  const location = useLocationByIdOrNull(destinationId);

  if (location === null) {
    return <></>;
  }
  const text = "Ziel";
  const icon = new Icon({
    iconUrl: getDestinationIcon(location.type),
    iconSize: [25, 41],
    iconAnchor: [12.5, 38],
    shadowUrl: markerShadow,
    shadowAnchor: [12.5, 38],
    popupAnchor: [0, -32]
  });

  const locationName = location.name.split(",");
  return (
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
};

function getDestinationIcon(type: string): string {
  switch (type) {
    case LocationTypeEnum.Address:
    case LocationTypeEnum.Unknown:
    case LocationTypeEnum.Crossing:
    case LocationTypeEnum.Street:
      return redLocationIcon;
    case LocationTypeEnum.Platform:
    case LocationTypeEnum.Stop:
      return redBusIcon;
    case LocationTypeEnum.Poi:
    case LocationTypeEnum.PoiHierarchy:
      return redPinIcon;
    case LocationTypeEnum.Gis:
    case LocationTypeEnum.Locality:
    case LocationTypeEnum.Sharing:
    case LocationTypeEnum.Suburb:
    case LocationTypeEnum.Singlehouse:
    default:
      return currentPositionIcon;
  }
}

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
