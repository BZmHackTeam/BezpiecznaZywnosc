import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonRouterContext, IonSearchbar, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";

import { useContext, useEffect, useRef, useState } from "react";

import styles from "./WarningsList.module.css";
import { Redirect, Route, Router, __RouterContext, useLocation } from "react-router";
import { chevronBack, closeOutline } from "ionicons/icons";

const WarningsList: React.FC = () => {
    const [dataset, setDataset] = useState<any[]>([]);
    const [warningsContent, setWarningsContent] = useState<any[]>([]);
    const [shouldFetchMoreData, setShouldFetchMoreData] = useState(false);
    const [isFirstRequest, setIsFirstRequest] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlySelectedWarning, setCurrentlySelectedWarning] = useState<object>();
    const { push } = useIonRouter();
    const eventRef = useRef();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        async function getDataset() {
            const response = await fetch("https://api.dane.gov.pl/1.4/datasets/855/resources?page=1&per_page=20&sort=-data_date&include=institution");
            const data = await response.json();

            setDataset(data.data);
        };

        getDataset();
    }, []);

    useEffect(() => {
        if (dataset !== undefined && dataset !== null) {
            if (isFirstRequest === true) {
                async function getDatasetElements() {
                    for (let datasetElement of dataset) {
                        const response = await fetch(datasetElement.relationships.tabular_data.links.related);
                        const data = await response.json();
                        
                        setWarningsContent(previousWarningsContent => [...previousWarningsContent, data.data[0].attributes]);
                    };
                };
                
                getDatasetElements();
            }
        };
    }, [dataset]);

    useEffect(() => {
        if (warningsContent.length === 20) {
            setIsFirstRequest(false);
        };
    }, [warningsContent]);

    function onIonScroll(event: any) {
        setPageIndex(previousPageIndex => previousPageIndex + 1);
        setShouldFetchMoreData(true);
        eventRef.current = event;
    };

    useEffect(() => {
        if (shouldFetchMoreData) {
            async function fetchNewData() {
                const response = await fetch(`https://api.dane.gov.pl/1.4/datasets/855/resources?page=${pageIndex}&per_page=20&sort=-data_date&include=institution`);
                const data = await response.json();

                setDataset(previousDataset => [...previousDataset, ...data.data]);

                for (let dataElement of data.data) {
                    const response2 = await fetch(dataElement.relationships.tabular_data.links.related);
                    const data2 = await response2.json();

                    setWarningsContent(previousWarningsContent => [...previousWarningsContent, data2.data[0].attributes]);
                };

                let id = setTimeout(() => {
                    setShouldFetchMoreData(false);
                    (eventRef.current as any).target.complete();
                }, 5000);
                
                return () => {
                    clearTimeout(id);
                };
            }

            fetchNewData();
        }
    }, [shouldFetchMoreData]);

    function openModal(warningContent: any) {
        setCurrentlySelectedWarning(warningContent);
        console.log(warningContent);
        setIsModalOpen(true);
    };

    function closeModal() {
        setCurrentlySelectedWarning(undefined);
        setIsModalOpen(false);
    }

    function handleInputValueChange(event: any) {
        setSearchValue(event.detail.value);
    };

    return (
        <>
            <IonSearchbar placeholder="Wpisz słowo kluczowe" value={searchValue} onIonChange={handleInputValueChange} />
                {warningsContent.length > 0 && (
                    <>
                        <IonList lines="full">
                            {warningsContent.map((warningContent, key) => (
                                <IonItem detail onClick={() => openModal(warningContent)} button key={key}>
                                    <IonLabel className="ion-text-wrap">
                                        {warningContent.col7.val}
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                        <IonModal isOpen={isModalOpen}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonTitle>
                                        Szczegóły
                                    </IonTitle>
                                    <IonButtons slot="start">
                                        <IonButton onClick={closeModal}>
                                            <IonIcon icon={chevronBack} />
                                            Powrót
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent>
                                {currentlySelectedWarning !== undefined && currentlySelectedWarning !== null && (
                                    <IonList lines="full">
                                        <IonItem>
                                            <IonLabel className={`${styles.label} ion-text-wrap`}>
                                                <h1>
                                                    {(currentlySelectedWarning as any).col3.val}
                                                </h1>
                                                <p>
                                                    województwo
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={`${styles.label} ion-text-wrap`}>
                                                <h1>
                                                    {(currentlySelectedWarning as any).col2.val}
                                                </h1>
                                                <p>
                                                    nazwa kodowa
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={`${styles.label} ion-text-wrap`}>
                                                <h1>
                                                    {(currentlySelectedWarning as any).col5.val}
                                                </h1>
                                                <p>
                                                    firma
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={`${styles.label} ion-text-wrap`}>
                                                <h1>
                                                    {(currentlySelectedWarning as any).col6.val}
                                                </h1>
                                                <p>
                                                    kategoria
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={`${styles.label} ion-text-wrap`}>
                                                <h1>
                                                    {(currentlySelectedWarning as any).col7.val}
                                                </h1>
                                                <p>
                                                    nazwa produktu
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem className={`${styles.label} ion-text-wrap`}>
                                            <IonLabel>
                                                <h1 className="ion-text-wrap">
                                                    {(currentlySelectedWarning as any).col9.val}
                                                </h1>
                                                <p>
                                                    powód zgłoszenia
                                                </p>
                                            </IonLabel>
                                        </IonItem>
                                    </IonList>
                                )}
                            </IonContent>
                        </IonModal>
                        <IonInfiniteScroll onIonInfinite={onIonScroll}>
                            <IonInfiniteScrollContent />
                        </IonInfiniteScroll>
                    </>
                )}
        </>
    );
};

export default WarningsList;