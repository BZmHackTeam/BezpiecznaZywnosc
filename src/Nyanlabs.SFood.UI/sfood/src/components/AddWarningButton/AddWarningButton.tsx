import { IonButton, useIonRouter } from "@ionic/react";

import styles from "./AddWarningButton.module.css";

const AddWarningButton: React.FC = () => {
    const { push } = useIonRouter();

    function sendReport() {
        push("/report");
    };

    return (
        <IonButton onClick={sendReport} className={styles.addWarningButton} color="success">
            Wyślij własne zgłoszenie
        </IonButton>
    );
};

export default AddWarningButton;