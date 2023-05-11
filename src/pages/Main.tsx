import { AmplifyUser } from '@aws-amplify/ui';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { useMemo } from 'react';
import './Main.css';

export interface MainProp {
    user: AmplifyUser
}

export const Main: React.FC<MainProp> = ({ user}) => {
    const directLine = useMemo(() => createDirectLine({ secret: '89Et2XauBY8.6IpmRylqRtyyFdIyL800zI66bclIE6Zjj-AN7Wgtsj0' }), []);

    console.log('directLine obj is', JSON.stringify(directLine));

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
                <IonText>Hello, your user ID is {user?.username}</IonText>
                <IonText>Hello, {user?.attributes?.name}</IonText>
                <IonText>Your email is {user?.attributes?.email}</IonText>
                <IonText>Your phone number is {user?.attributes?.phone_number}</IonText>
                <IonText>Your birthday is {user?.attributes?.birthdate}</IonText>
                <IonText>Your picture is {user?.attributes?.picture}</IonText>
                <ReactWebChat directLine={directLine}/>
            </IonContent>

        </IonPage>
    );
};
