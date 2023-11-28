import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/react";
import { parseISO } from "date-fns";
import { calendarClearOutline, closeCircleOutline, heart, search, swapVerticalOutline } from "ionicons/icons";
import { useState } from "react";
import {
  FootpathLeg,
  Journey,
  LegOriginLocationTypeEnum,
  Location,
  TransportationLeg,
  TransportationLegTypeEnum
} from "../../api";
import { useDepartureTimeParamOrCurrentTime } from "../../hooks/useDepartureTimeParamOrCurrentTime";
import { useJourneyQuery } from "../../hooks/useJourneyQuery";
import { useLocationByIdOrNull } from "../../hooks/useLocationByIdOrNull";
import { useStateParams } from "../../hooks/useStateParams";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import FavoritesPage from "../../pages/FavoritesPage";
import {
  CreateFavoriteRoute,
  CreateFavoriteTrip,
  useFavoriteRoutes,
  useFavoriteTrips
} from "../../services/favorites/FavoritesContext";
import JourneyListComponent from "../JourneyListComponent";
import { LocationSearchInput } from "../LocationSearch/LocationSearchInput";
import rp from "./RoutePlanner.module.css";

export interface RoutePlannerProps {
  setSelectedOriginLocation: (location: Location) => void
  setSelectedDestinationLocation: (location: Location) => void
}

const RoutePlanner = ({ setSelectedOriginLocation, setSelectedDestinationLocation }: RoutePlannerProps): JSX.Element => {

  const [originId, setOriginId] = useStateParams<string | null>(null, "origin", String, String);
  const [destinationId, setDestinationId] = useStateParams<string | null>(null, "destination", String, String);
  const [departureTime, setDepartureTime, resetDepartureTimeToCurrentTime] = useDepartureTimeParamOrCurrentTime();
  // Using specific deserialize because using Boolean() constructor trues everything except empty string.
  const [asArrivalTime, setAsArrivalTime] = useStateParams<boolean>(false, "asArrivalTime", String, (boolStr) => boolStr === "true");

  const originLocation = useLocationByIdOrNull(originId);
  const destinationLocation = useLocationByIdOrNull(destinationId);

  const { favoriteTrips, addFavoriteTrip } = useFavoriteTrips();
  const { favoriteRoutes, addFavoriteRoute } = useFavoriteRoutes();

  const setTrip = (trip: CreateFavoriteTrip): void => {
    setIsFavoritesDialogueOpen(false);
    setIsFavoritesModalOpen(false);
    setOriginId(trip.originId);
    setDestinationId(trip.destinationId);
    setDepartureTime(trip.startTime);
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
      && c.startTime === departureTime
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

  const toggleOriginDestinationLocation = (): void => {
    const tempOriginId = originId;
    setOriginId(destinationId);
    setDestinationId(tempOriginId);
    const tempOriginLocation = useLocationByIdOrNull(originId);
    if (tempOriginLocation !== null) { setSelectedOriginLocation(tempOriginLocation); }
    const tempDestinationLocation = useLocationByIdOrNull(destinationId);
    if (tempDestinationLocation !== null) {
      setSelectedDestinationLocation(tempDestinationLocation);
    }
  };

  return (
    <>
      <IonList className={rp.center_all_column} inset={true}>
        <IonItem className={rp.date_time_card} lines="none">
          <IonRow className={rp.center_all_row}>
            <IonCol>
              <IonRow className={rp.center_all_row}>
                <IonIcon className={rp.date_icon} icon={calendarClearOutline} />
                <IonLabel className="ion-align-self-center">Datum und Uhrzeit</IonLabel>
              </IonRow>
              <IonRow className={rp.toggle_button_row}>
                <IonLabel className={rp.toggle_button_label}>Abfahrtszeit</IonLabel>
                <IonToggle className={rp.toggle_button}
                  checked={asArrivalTime}
                  onIonChange={() => setAsArrivalTime(!asArrivalTime)} />
                <IonLabel className={rp.toggle_button_label}>Ankunftszeit</IonLabel>
              </IonRow>
              <IonRow className={rp.date_time_row}>
                {/* Date-Time-Picker, allowing the user to select dates in the present as well as in the future. */}
                {/* Button to delete custom date/time inputs and use current time. */}
                <IonButton className={rp.button_secondary}
                  fill="outline"
                  onClick={() => resetDepartureTimeToCurrentTime()}
                >
                  Jetzt
                </IonButton>
                <IonDatetimeButton className={rp.date_time_button} aria-label="Datum und Uhrzeit" datetime="datetime" />
                {/* Before datetime modal is being presented min departure time is updated to current time. */}
                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    name="date_time"
                    id="datetime"
                    /* Don't use currentTime here because its frequent updates lead to "glitching"/"jumping" of UI/Map. */
                    value={departureTime}
                    multiple={false} // Assures that value cannot be an array but a single date string only.
                    showDefaultButtons={true}
                    data-testid={"datetime-input"}
                    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                    onIonChange={e => setDepartureTime(e.detail.value! as string)}
                  />
                </IonModal>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonItem>
        <IonRow className={rp.start_all_row}>
          <IonCol className={rp.input_field_width}>
            <IonItem>
              <LocationSearchInput
                inputLabel="Startpunkt"
                selectedLocation={originLocation}
                onSelectedLocationChanged={(location): void => {
                  setOriginId(location.id);
                  setSelectedOriginLocation(location);
                }}
                prefixDataTestId="origin-input"
              />
            </IonItem>
            <IonItem>
              <LocationSearchInput
                inputLabel="Zielpunkt"
                selectedLocation={destinationLocation}
                onSelectedLocationChanged={(location): void => {
                  setDestinationId(location.id);
                  setSelectedDestinationLocation(location);
                }}
                prefixDataTestId="destination-input"
              />
            </IonItem>
          </IonCol>
          <IonButton
            fill="clear"
            expand="block"
            onClick={toggleOriginDestinationLocation}
          >
            <IonIcon slot="start" icon={swapVerticalOutline} />
          </IonButton>
        </IonRow>
        <IonRow className={rp.button_row}>
          <IonButton className={rp.button_secondary} fill="outline" expand="block"
            onClick={() => addToFavorites()}
          >
            <IonIcon slot="start" icon={heart} />
            Merken
          </IonButton>
          <IonButton className={rp.button_primary} type="submit" size="default" expand="block">
            <IonIcon slot="start" icon={search} />
            Routen suchen
          </IonButton>
        </IonRow>
      </IonList >
      {
        originLocation !== null && destinationLocation !== null &&
        <TripOptionsDisplay
          origin={originLocation}
          destination={destinationLocation}
          departure={departureTime}
          asArrival={asArrivalTime}
        />
      }
      <IonModal className={rp.favorite_dialogue} id="favorite_dialogue" isOpen={isFavoriteDialogueOpen} onDidDismiss={() => setIsFavoritesDialogueOpen(false)}>
        <IonContent>
          <IonToolbar className={rp.modal_toolbar}>
            <IonTitle>Add to favorites</IonTitle>
            <IonButtons slot="end">
              <IonButton color="light" onClick={() => setIsFavoritesDialogueOpen(false)}>
                <IonIcon icon={closeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <div className={rp.modal_content_section} id="content_section">
            <div>
              Do you want to save as Route or as Trip?
            </div>
            <div className={rp.modal_buttons} id="buttons">
              <IonButton disabled={!canCurrentRouteBeFavorited()} onClick={() => { if (originId && destinationId) { addFavoriteRoute({ originId, destinationId }); setIsFavoritesDialogueOpen(false); } }}>Route</IonButton>
              <IonButton disabled={!canCurrentTripBeFavorited()} onClick={() => {
                if (originId && destinationId) {
                  addFavoriteTrip({ originId, destinationId, startTime: departureTime });
                  setIsFavoritesDialogueOpen(false);
                }
              }}>Trip</IonButton>
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
            onRouteSelected={(route: CreateFavoriteRoute) => setRoute(route)}
            onTripSelected={(trip: CreateFavoriteTrip) => setTrip(trip)} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default RoutePlanner;

// TODO Duplicate with TripOptionsDisplay file.
export function TripOptionsDisplay(props: {
  origin: Location,
  destination: Location,
  departure: string,
  asArrival: boolean
}): JSX.Element {
  const { origin, destination, departure, asArrival } = props;

  const departureDate = parseISO(departure);
  const result = useJourneyQuery(origin, destination, departureDate, asArrival);

  const iJourneys: false | IJourney[] = result.type === "success"
    && result.journeyResults
      .map((journey): IJourney => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const legs: (TransportationLeg | FootpathLeg)[] = journey.legs;

        const lastLeg = legs[legs.length - 1];
        const firstLeg = legs[0];

        return {
          startStation: firstLeg.origin.name,
          startTime: firstLeg.origin.departureTimeEstimated,
          arrivalStation: lastLeg.destination.name,
          arrivalTime: lastLeg.destination.arrivalTimeEstimated,
          stops: legs.map((leg): IJourneyStep => ({
            arrivalTime: leg.destination.arrivalTimeEstimated,
            startTime: leg.origin.departureTimeEstimated,
            stationName: leg.origin.name,
            track: leg.origin.type === LegOriginLocationTypeEnum.Platform
              ? leg.origin.details.shortName
              : "",
            stopName: leg.destination.name,
            travelDurationInMinutes: leg.details.duration / 60,
            line: "transportation" in leg ? leg.transportation.line : ""
          })),
          travelDurationInMinutes: legs.reduce((acc, leg) => acc + leg.details.duration, 0) / 60
        };
      });

  return (
    <>
      {result.type === "error" && <div>Error: {result.error.message}</div>}
      {result.type === "pending" && <div>Searching...</div>}
      {iJourneys &&
        <JourneyListComponent journeys={iJourneys} />
      }
    </>
  );
}

export function RenderTrip(props: { journey: Journey }): JSX.Element {
  const { journey } = props;

  return (
    <IonItem>
      <IonLabel>
        <ol>
          {
            journey.legs.map((leg, idx) => (
              <li key={idx}>
                {
                  leg.type === TransportationLegTypeEnum.Transportation
                    ? (leg as TransportationLeg).transportation.name
                    : "Footpath"
                }
                {leg.details.duration}
              </li>
            ))
          }
        </ol>
      </IonLabel>
    </IonItem>
  );
}
