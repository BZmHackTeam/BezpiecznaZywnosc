import { IonItem, IonLabel, IonList } from "@ionic/react";

import { useEffect, useState } from "react";

const WarningsList: React.FC = () => {
    const [dataset, setDataset] = useState<any[]>([]);
    const [warningsIds, setWarningsIds] = useState<string[]>([]);
    const [warningsContent, setWarningsContent] = useState<any[]>([]);

    useEffect(() => {
        async function getDataset() {
            const response = await fetch("https://api.dane.gov.pl/1.4/datasets/855/resources?page=1&per_page=20&sort=-data_date&include=institution");
            const data = await response.json();

            setDataset(data.data);
            console.log(data.data);
        };

        getDataset();
    }, []);

    useEffect(() => {
        if (dataset !== null && dataset !== undefined) {
            const datasetLength = (dataset as any).length;

            for (let i = 0; i < datasetLength; i++) {
                setWarningsIds(previousWarningsIds => [...previousWarningsIds, (dataset as any)[i].id]);
            }
        }
    }, [dataset]);

    useEffect(() => {
        if (warningsIds.length === 20) {
            async function getWarningsContent(id: string) {
                const response = await fetch(`https://api.dane.gov.pl/1.4/resources/${id}/data?page=1&per_page=20`);
                const data = await response.json();

                setWarningsContent(previousWarningsContent => [...previousWarningsContent, data.data[0].attributes]);
            };

            for (let i = 0; i < warningsIds.length; i++) {
                getWarningsContent(warningsIds[i]);
            };

            console.log("First content request");
        }
    }, [warningsIds]);

    return warningsContent.length > 0 ? (
        <>
            <IonList lines="full">
                {warningsContent.map((warningContent, key) => (
                    <IonItem key={key}>
                        <IonLabel>
                            {warningContent.col7.val}
                        </IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </>
    ) : <></>;
};

export default WarningsList;