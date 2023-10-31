import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { formatISO, isSameMinute, parseISO } from "date-fns";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import {
  Location
} from "../../api";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import { useCustomDepartureTimeUrlParamOrCurrentTime } from "../../hooks/useCustomDepartureTimeOrCurrentTime";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import FavoritesPage from "../../pages/FavoritesPage";
import { CreateFavoriteRoute, CreateFavoriteTrip, useFavoriteRoutes, useFavoriteTrips } from "../../services/favorites/FavoritesContext";
import { LocationSearchInput } from "../LocationSearch/LocationSearchInput";
import "./RoutePlanner.css";
import { TripOptionsDisplay } from "./TripOptionsDisplay";

export const DEPARTURE_TIME_NOW_PARAM = "now";

export interface RoutePlannerProps {
  onSelectedOriginLocationChanged: (location: Location) => void
  onSelectedDestinationLocationChanged: (location: Location) => void
}

const RoutePlanner = ({ onSelectedOriginLocationChanged, onSelectedDestinationLocationChanged }: RoutePlannerProps): JSX.Element => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [startTime, setStartTime] = useStateParams<string>(new Date().toISOString(), "startTime", String, String);

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const currentTime = useCurrentTime();
  const [customDepartureTime, setCustomDepartureTime] = useStateParams<string>(DEPARTURE_TIME_NOW_PARAM, "departure", String, String);
  const [minDepartureTime, setMinDepartureTime] = useState<Date>(currentTime);
  const departureTime = useCustomDepartureTimeUrlParamOrCurrentTime(customDepartureTime);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();
  const { favoriteRoutes, addFavoriteRoute } = useFavoriteRoutes();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
    setStartTime(trip.startTime);
  };

  const setRoute = (route: CreateFavoriteRoute): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(route.originId);
    setDestinationId(route.destinationId);
  };

  const currentIsFavoriteTrip = (): boolean => {
    const existing = favoriteTrips.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
      && c.startTime === startTime
    );
    return existing !== undefined;
  };

  const currentIsFavoriteRoute = (): boolean => {
    const existing = favoriteRoutes.find(c =>
      c.originId === originId
      && c.destinationId === destinationId
    );
    return existing !== undefined;
  };

  const canCurrentTripBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteTrip();
  const canCurrentRouteBeFavorited = (): boolean => originLocation !== null && destinationLocation !== null && !currentIsFavoriteRoute();

  const addToFavorites = (): void => {
    if (originId === null || destinationId === null) return;
    setIsFavoritesDialogueOpen(true);
  };

  const [isFavoriteDialogueOpen, setIsFavoritesDialogueOpen] = useState(false);

  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const showFavorites = (): void => {
    setIsFavoritesModalOpen(true);
  };

  const updateMinDepartureTime = (): void => {
    setMinDepartureTime(currentTime);
  };

  /**
   * Sets some time given as string as custom departure time.
   *
   * @param departure departure time (as ISO string)
   */
  const setCustomDeparture = (departure: string): void => {
    const parsedDeparture: Date = parseISO(departure);
    // If min value (current time) gets selected, encode this in url param.
    const customDepartureTimeString: string =
      isSameMinute(parsedDeparture, minDepartureTime)
        ? DEPARTURE_TIME_NOW_PARAM
        : formatISO(parsedDeparture);

    setCustomDepartureTime(customDepartureTimeString);
  };

  return (
    <>
      <IonList inset={true}>
        <IonItem lines="inset">
          {/* Date-Time-Picker, allowing the user to select dates in the present as well as in the future. */}
          <IonLabel>Date and Time</IonLabel>
          {/* Button to delete custom date/time inputs and use current time. */}
          <IonButton
            fill="outline"
            strong={true}
            onClick={() => setCustomDeparture(formatISO(currentTime))}
          >
            Now
          </IonButton>
          <IonDatetimeButton aria-label="Date and Time" datetime="datetime" />
          {/* Before datetime modal is being presented min departure time is updated to current time. */}
          <IonModal keepContentsMounted={true} onWillPresent={() => updateMinDepartureTime()}>
            <IonDatetime
              name="date_time"
              id="datetime"
              /* Don't use currentTime here because its frequent updates lead to "glitching"/"jumping" of UI/Map. */
              min={formatISO(minDepartureTime)}
              value={formatISO(departureTime)}
              multiple={false} // Assures that value cannot be an array but a single date string only.
              showDefaultButtons={true}
              data-testid={"datetime-input"}
              /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
              onIonChange={e => { setCustomDeparture(e.detail.value! as string); setStartTime(e.detail.value as string); }}
            />
          </IonModal>
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Origin"
            selectedLocation={originLocation}
            onSelectedLocationChanged={(location): void => {
              setOriginId(location.id);
              onSelectedOriginLocationChanged(location);
            }}
            prefixDataTestId="origin-input"
          />
        </IonItem>
        <IonItem>
          <LocationSearchInput
            inputLabel="Destination"
            selectedLocation={destinationLocation}
            onSelectedLocationChanged={(location): void => {
              setDestinationId(location.id);
              onSelectedDestinationLocationChanged(location);
            }}
            prefixDataTestId="destination-input"
          />
        </IonItem>
        <IonButton type="submit" size="default" expand="block">Search routes</IonButton>
        <IonButton expand="block" color="warning"

          onClick={() => addToFavorites()}
        >Add To Favorites</IonButton>
        <IonButton expand="block" color="warning"
          onClick={() => showFavorites()}
        >Show Favorites</IonButton>
      </IonList>
      {
        originLocation !== null && destinationLocation !== null &&
        <TripOptionsDisplay
          origin={originLocation}
          destination={destinationLocation}
          departure={departureTime}
        />
      }
      <IonModal id="favorite-dialogue" isOpen={isFavoriteDialogueOpen} onDidDismiss={() => setIsFavoritesDialogueOpen(false)}>
        <IonContent>
          <IonToolbar>
            <IonTitle>Add to favorites</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => setIsFavoritesDialogueOpen(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div id="content-section">
            <div>
              Do you want to save as Route or as Trip?
            </div>
            <div id="buttons">
              <IonButton disabled={!canCurrentRouteBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteRoute({ originId, destinationId }); setIsFavoritesDialogueOpen(false); } }}>Route</IonButton>
              <IonButton disabled={!canCurrentTripBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteTrip({ originId, destinationId, startTime }); setIsFavoritesDialogueOpen(false); } }}>Trip</IonButton>
            </div>
          </div>

        </IonContent>
      </IonModal>
      <IonModal
        isOpen={isFavoritesModalOpen}
        onDidDismiss={() => setIsFavoritesModalOpen(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* set launchTab=1 to start at Routes Tab -> 0=stations, 2=Journeys */}
          <FavoritesPage
            launchTab={1}
            showHeader={false}
            onRouteSelected={route => setRoute(route)}
            onTripSelected={trip => setTrip(trip)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;
