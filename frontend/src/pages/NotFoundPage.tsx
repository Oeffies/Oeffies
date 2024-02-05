import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { thunderstorm } from "ionicons/icons";
import { Header } from "../components/Header";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => (
  <IonPage id="main-content">
    <Header />
    <IonContent fullscreen>
      <div className={styles.error}>
        <IonIcon className={styles.errorIcon} src={thunderstorm} />
        <div>
          <p className={styles.errorCode}>404</p>
          <p className={styles.errorMessage}>Page not found</p>
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default NotFoundPage;