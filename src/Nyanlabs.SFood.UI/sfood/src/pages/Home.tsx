import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import WarningsList from '../components/WarningsList/WarningsList';
import Search from '../components/Search/Search';
import AddWarningButton from '../components/AddWarningButton/AddWarningButton';

import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bezpieczna żywność</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bezpieczna żywność</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className={`${styles.addWarningButtonDiv} ion-padding-horizontal`}>
          <AddWarningButton />
        </div>
        <WarningsList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
