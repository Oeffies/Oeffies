import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export interface MapControllerProps {
  bounds: LatLngTuple[]
}

const MapController = (props: MapControllerProps): JSX.Element => {

  const map = useMap();
  const flyToDuration = 1.5;

  useEffect(() => {
    map.flyToBounds(props.bounds, {
      duration: flyToDuration
    });

  }, [props]);

  return <></>;
};

export default MapController;
