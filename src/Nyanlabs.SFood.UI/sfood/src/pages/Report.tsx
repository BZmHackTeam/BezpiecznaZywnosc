import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import { FormEventHandler, useState } from 'react';

import styles from "./Report.module.css";

const IncidentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    productName: '',
    producer: '',
    submitterAddress: '',
    description: '',
    location: '',
    date: ''
  });
    
const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/incident/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully.');
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  function handleDateChange(event: any) {
    setFormData(previousFormData => ({
      ...previousFormData,
      date: event.detail.value.substring(0, 10)
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Powrót" />
          </IonButtons>
          <IonTitle>
            Zgłoszenie
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full">
          <IonAccordionGroup>
            <IonAccordion>
              <IonItem slot="header">
                <IonLabel>Data</IonLabel>
                <IonNote slot="end">
                  {formData.date.replaceAll("-", ".")}
                </IonNote>
              </IonItem>
              <IonDatetime locale="pl-PL" onIonChange={handleDateChange} className={styles.datetime} slot="content" presentation="date" min="2023-10-15" max="2023-10-22" />
            </IonAccordion>
          </IonAccordionGroup>

          <IonItem>
            <IonLabel position="floating">Nazwa produktu</IonLabel>
            <IonInput
              type="text"
              value={formData.productName}
              onIonChange={(e) => handleInputChange('productName', e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Producent</IonLabel>
            <IonInput
              type="text"
              value={formData.producer}
              onIonChange={(e) => handleInputChange('producer', e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Lokalizacja</IonLabel>
            <IonInput
              type="text"
              value={formData.location}
              onIonChange={(e) => handleInputChange('location', e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Opis</IonLabel>
            <IonInput
              type="text"
              value={formData.description}
              onIonChange={(e) => handleInputChange('description', e.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Adres e-mail</IonLabel>
            <IonInput
              type="text"
              value={formData.submitterAddress}
              onIonChange={(e) => handleInputChange('submitterAddress', e.detail.value)}
            />
          </IonItem>

          <IonButton onClick={(e) => handleSubmit(e as any)} type="submit">
            Wyślij
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default IncidentForm;
