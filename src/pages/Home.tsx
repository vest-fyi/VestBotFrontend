import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure(awsExports);


const Home: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    const directLine = useMemo(() => createDirectLine({ secret: '8tQBKXPlY0I.f91gY5oLRdu4U0_oN_fhsJp7YrP4m_7PLb36XtdM0Wc' }), []);

    return (
        <IonPage>
            <IonHeader>

                <IonTitle>Hello, Ionic React AWS Amplify</IonTitle>

            </IonHeader>
            <IonContent fullscreen>
                <IonTitle>Hello, body</IonTitle>
            </IonContent>
        </IonPage>

        // <Authenticator>
        //     {({ signOut, user }) => (
        //         <IonPage>
        //             <IonHeader>
        //                 <IonToolbar>
        //                     <IonTitle>Hello, {user?.username} Ionic React AWS Amplify</IonTitle>
        //                 </IonToolbar>
        //             </IonHeader>
        //             <IonContent fullscreen>
        //                 <IonFooter>
        //                     <IonButton onClick={signOut}>Sign out</IonButton>
        //                 </IonFooter>
        //             </IonContent>
        //         </IonPage>
        //     )}
        // </Authenticator>
    );
};


export default Home;
