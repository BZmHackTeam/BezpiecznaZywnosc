import { IonButton, IonIcon } from "@ionic/react";

import { ellipsisVerticalOutline } from "ionicons/icons";

import styles from "./SearchFilter.module.css";

const SearchFilter: React.FC = () => {
    return (
        <IonButton className={styles.searchfilter} size="small" shape="round">
            <IonIcon icon={ellipsisVerticalOutline} />
        </IonButton>
    );
};

export default SearchFilter;