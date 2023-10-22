import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";

import styles from "./AddWarningButton.module.css";

import { FormEventHandler, useState } from "react";

const AddWarningButton: React.FC = () => {
    const { push } = useIonRouter();

    function sendReport() {
        push("/report");
    };

    return (
        <>
            <IonButton onClick={sendReport} className={styles.addWarningButton} color="success">
                Wyślij własne zgłoszenie
            </IonButton>
        </>
    );
};

export default AddWarningButton;