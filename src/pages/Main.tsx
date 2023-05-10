import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { useMemo } from 'react';
import './Page.css';

const Main: React.FC = () => {
    const directLine = useMemo(() => createDirectLine({ secret: '89Et2XauBY8.6IpmRylqRtyyFdIyL800zI66bclIE6Zjj-AN7Wgtsj0' }), []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle> Main Screen </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <ReactWebChat directLine={directLine}/>
            </IonContent>

        </IonPage>
    );
};

export default Main;
