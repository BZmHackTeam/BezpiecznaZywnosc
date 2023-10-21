import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import styles from "./AddWarningButton.module.css";

import { FormEventHandler, useState } from "react";

const AddWarningButton: React.FC = () => {
    const [shouldOpenModal, setShouldOpenModal] = useState(false);

    function openModal() {
        setShouldOpenModal(true);
    };

    const [formData, setFormData] = useState({
        name: '',
        productName: '',
        producer: '',
        submitterAddress: '',
        description: '',
        location: ''
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

    return (
        <>
            <IonButton onClick={openModal} className={styles.addWarningButton} color="success">
                Wyślij własne zgłoszenie
            </IonButton>
            <IonModal isOpen={shouldOpenModal}>
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>
                                Zgłoszenie
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">
                                    Zgłoszenie
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <form onSubmit={handleSubmit}>
                            <IonItem>
                                <IonLabel position="floating">Imię</IonLabel>
                                <IonInput
                                type="text"
                                value={formData.name}
                                onIonChange={(e) => handleInputChange('name', e.detail.value)}
                                />
                            </IonItem>
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
                            <IonButton expand="full" type="submit">
                                Wyślij
                            </IonButton>
                        </form>
                    </IonContent>
                </IonPage>
            </IonModal>
        </>
    );
};

export default AddWarningButton;