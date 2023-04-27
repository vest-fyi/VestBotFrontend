import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const directLine = useMemo(() => createDirectLine({ secret: '8tQBKXPlY0I.f91gY5oLRdu4U0_oN_fhsJp7YrP4m_7PLb36XtdM0Wc' }), []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          <ReactWebChat directLine={directLine} />
          {/*<IonHeader collapse="condense">*/}
        {/*  <IonToolbar>*/}
        {/*    <IonTitle size="large">{name}</IonTitle>*/}
        {/*  </IonToolbar>*/}
        {/*</IonHeader>*/}
        {/*<ExploreContainer name={name} />*/}
      </IonContent>

    </IonPage>
  );
};

export default Page;
