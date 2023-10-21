import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import WarningsList from '../components/WarningsList/WarningsList';
import Search from '../components/Search/Search';

import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bezpieczna żywnosc</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bezpieczna żywnosc</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Search />
        <WarningsList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
