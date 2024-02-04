import { IonButton, IonContent, IonModal, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import JourneyDetail from "../../components/JourneyDetail";
import LiveNavigationInfoComponent from "../../components/LiveNavigationInfo/LiveNavigationInfoComponent";
import { SuggestionModalComponent } from "../../components/suggestionModal/SuggestionModalComponent";
import { IJourney } from "../../interfaces/IJourney.interface";
import { IJourneyStep } from "../../interfaces/IJourneyStep.interface";
import { useJourneyApi, useLocationFinderApi } from "../../services/apiClients/ApiClientsContext";
import { blackListJourney, findJourneyFromNextStop, parseJSONToJourney } from "../../services/smartSuggestion/smartSuggestionFunctions";
import styles from "./LiveNavigation.module.css";

const LiveNavigation: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<IJourney | null>(parseJSONToJourney(window.localStorage.getItem("selectedJourney")));
  const [showModal, setshowModal] = useState<boolean>(false);
  const [recommendedJourney, setRecommendedJourney] = useState<IJourney | null>(null);
  const [recommendedJourneyInterval, setRecommendedJourneyInterval] = useState<NodeJS.Timeout>();
  const locationFinderApi = useLocationFinderApi();
  const journeyApi = useJourneyApi();

  /*
  const [displayArrivedNotification, setDisplayArrivedNotification] = useState<boolean>(false);
  const [arrivedNotificationMessage, setArrivedNotificationMessage] = useState<string>("Sie haben die Haltestelle ... erreicht.");
  const currentLocation = useCurrentLocation();
  
  const selectedJourneyAsString = window.localStorage.getItem("selectedJourney");
  let selectedJourney: IJourney | null = null;
  const stopIds: string[] = [];

  if (selectedJourneyAsString !== null) {
    selectedJourney = JSON.parse(selectedJourneyAsString) as IJourney;
    selectedJourney.arrivalTime = new Date(selectedJourney.arrivalTime);
    selectedJourney.startTime = new Date(selectedJourney.startTime);

    for (const step of selectedJourney.stops) {
      step.arrivalTime = new Date(step.arrivalTime);
      step.startTime = new Date(step.startTime);
      stopIds.push(step.stopIds[step.stopIds.length - 1]);
    }
  }

  const locations: Location[] = stopIds.length > 0 ? useMultipleLocationsByIdOrNull(stopIds) : [];
  
  const isCurrentLocationArrivedAtStopLocation = (position: LocationCoordinates, destination: LocationCoordinates): boolean => {
    const range = 0.000001;
    return ((destination.latitude + range) >= position.latitude && (destination.latitude - range) <= position.latitude)
      && ((destination.longitude + range) >= position.longitude && (destination.longitude - range) <= position.longitude);
  };

  const watchPosition = (): void => {
    const currentPositionCoordinates: LocationCoordinates = {
      latitude: currentLocation.location?.coords.latitude,
      longitude: currentLocation.location?.coords.longitude
    } as LocationCoordinates;

    locations.map(location => {
      if (isCurrentLocationArrivedAtStopLocation(currentPositionCoordinates, location.details.coordinates)) {
        setDisplayArrivedNotification(true);
        setArrivedNotificationMessage("Sie haben die Haltestelle " + location.name + " erreicht.");
        console.log("Sie haben die Haltestelle " + location.name + " erreicht.");
      }
    });
  };
*/
  useEffect(() => {

    // watchPosition();

    if (recommendedJourneyInterval === undefined) {
      setRecommendedJourneyInterval(setInterval(() => {
        void findJourneyFromNextStop(locationFinderApi, journeyApi);
        setRecommendedJourney(parseJSONToJourney(window.localStorage.getItem("recJourney")));
        if (window.localStorage.getItem("recJourney") !== null) {
          setshowModal(true);
        }
      }, 120000));
    }

    return recommendedJourneyInterval !== undefined
      ? () => clearInterval(recommendedJourneyInterval)
      : () => console.log("No interval set.");
  }, []);

  return (
    <IonPage id="main-content">
      <Header />
      <IonContent>
        {
          selectedJourney !== null &&
          <>
            <LiveNavigationInfoComponent arrivalTime={selectedJourney?.arrivalTime} />
            <JourneyDetail journey={selectedJourney} />
          </>
        }
        <IonButton className="back-button" onClick={() => { window.localStorage.removeItem("selectedJourney"); history.back(); }}
          size="default" expand="block">
          Navigation Beenden
        </IonButton>
        {/*   <IonButton onClick={() => setDisplayArrivedNotification(!displayArrivedNotification)}>show toast</IonButton>
        <IonToast
          isOpen={displayArrivedNotification}
          message={arrivedNotificationMessage}
          position="bottom"
          duration={3000}
          icon={notificationsCircle} /> */}
      </IonContent>
      <IonModal className={styles.suggestionModal} isOpen={showModal} >
        <SuggestionModalComponent
          updateSelectedJourney={() => {
            updateSelectedJourney(recommendedJourney, setSelectedJourney, selectedJourney);
            setshowModal(false);
          }}
          dismiss={() => {
            setshowModal(false);
            blackListJourney();
          }}
          recommendedJourney={recommendedJourney} />
      </IonModal>
    </IonPage>);
};

export default LiveNavigation;

function updateSelectedJourney(recJourney: IJourney | null, setSelectedJourney: (journey: IJourney | null) => void, selectedJourney: IJourney | null): void {
  let updatedStops: IJourneyStep[] = [];
  if (recJourney && selectedJourney) {
    updatedStops = selectedJourney?.stops.filter(
      stop => stop.startTime < recJourney?.stops[0].startTime
    );
    updatedStops = updatedStops?.concat(recJourney?.stops);
  }

  if (recJourney) {
    recJourney.stops = updatedStops;
  }
  window.localStorage.removeItem("selectedJourney");
  window.localStorage.setItem("selectedJourney", JSON.stringify(recJourney));
  setSelectedJourney(recJourney);
}
