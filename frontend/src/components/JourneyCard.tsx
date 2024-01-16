import { IonCard, IonCol, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { trainOutline } from "ionicons/icons";
import { IJourney } from "../interfaces/IJourney.interface";
import "./JourneyCard.css";

export interface TravelProps { journey: IJourney }

const formatDateShort = (date: Date): string => format(date, "HH:mm");

const timeSplitter = (traveltime: number): number[] => {
  const traveltimeHours = Math.floor(traveltime / 60);
  const traveltimeMinutes = traveltime % 60;
  return [traveltimeHours, traveltimeMinutes];
};

const JourneyCard: React.FC<TravelProps> = (props: TravelProps) => (
  <IonCard className="detail-card-sizing">
    <IonRow className="center_all_row_2">

      <IonIcon className="train_icon" icon={trainOutline} />
      <IonCol className="mid-section">
        <IonLabel>
          <h2>
            {formatDateShort(props.journey.startTime)} - {formatDateShort(props.journey.arrivalTime)}
          </h2>
        </IonLabel>
        <IonLabel>
          {props.journey.startStation} - {props.journey.arrivalStation}
        </IonLabel>
      </IonCol>
      <IonCol className="duration">
        <div>
          {props.journey.travelDurationInMinutes < 60 && (
            <IonCol>
              <IonLabel>
                <h1>{props.journey.travelDurationInMinutes}</h1>
              </IonLabel>
              <IonLabel className="minuteTime">Min</IonLabel>
            </IonCol>
          )}
        </div>
        <div>
          {props.journey.travelDurationInMinutes >= 60 && (
            <IonRow className="traveltime">
              <IonCol>
                <IonLabel>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[0]}</h1>
                </IonLabel>
                <IonLabel>Std</IonLabel>
              </IonCol>
              <IonCol>
                <IonLabel>
                  <h1>{timeSplitter(props.journey.travelDurationInMinutes)[1]}</h1>
                </IonLabel>
                <IonLabel>Min</IonLabel>
              </IonCol>
            </IonRow>

          )}
        </div>
      </IonCol>
    </IonRow>
  </IonCard>
);

export default JourneyCard;

export interface StepDetailsProps { journey: IJourney, }

