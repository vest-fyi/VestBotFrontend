import { AmplifyUser } from '@aws-amplify/ui';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
                    <IonTitle>Hello, your user ID is {user?.username}</IonTitle>
                    <IonTitle>Hello, {user?.attributes?.name}</IonTitle>
                    <IonTitle>Your email is {user?.attributes?.email}</IonTitle>
                    <IonTitle>Your phone number is {user?.attributes?.phone_number}</IonTitle>
                    <IonTitle>Your birthday is {user?.attributes?.birthdate}</IonTitle>
                    <IonTitle>Your picture is {user?.attributes?.picture}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <ReactWebChat directLine={directLine}/>
            </IonContent>

        </IonPage>
    );
};
