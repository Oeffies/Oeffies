import { IonItem, IonList } from "@ionic/react";
import { IJourney } from "../interfaces/IJourney.interface";
import JourneyCard from "./JourneyCard";
import "./JourneyListComponent.css";

interface IJourneyListProps {
  setActiveJourney: (journey: IJourney) => void,
  journeys: IJourney[]
}

const JourneyListComponent: React.FC<IJourneyListProps> = (props: IJourneyListProps) => (
  <div className="JourneyListComponent">
    <IonList mode="ios" className="detail-card">
      {(props.journeys.map((journey, index) =>
        <IonItem mode="ios" className="no-border-item" key={"item" + index} onClick={() => props.setActiveJourney(journey)} >
          <JourneyCard key={"journey" + index} journey={journey} />
        </IonItem>
      ))}
    </IonList>
  </div>
);

export default JourneyListComponent;
