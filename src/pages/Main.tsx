import { AmplifyUser } from '@aws-amplify/ui';
import {
    InputChangeEventDetail, IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonInput, IonItem,
    IonMenuButton, IonModal,
    IonPage,
    IonSpinner,
    IonText,
    IonToolbar
} from '@ionic/react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Main.css';
import { Preferences } from '@capacitor/preferences';

export interface MainProp {
    user: AmplifyUser;
    emailFromStorage?: string;
}

export const Main: React.FC<MainProp> = ({ user }) => {
    const [ isLoading, setIsLoading ] = useState(true);

    // -------------------
    // Bot Framework Web Chat Config
    // -------------------
    const directLine = useMemo(() => createDirectLine({
        // secret: '89Et2XauBY8.NLUFJiExmvbNiPLmpG51ECssq6LqV1WvHoatqEY_q-A'
        secret: '89Et2XauBY8.6IpmRylqRtyyFdIyL800zI66bclIE6Zjj-AN7Wgtsj0'
    }), []);

    const styleOptions = {
        bubbleBackground: '#F2F2F2',
        bubbleFromUserBackground: '#D6E9FF',
        bubbleBorderRadius: 8,
        bubbleFromUserBorderRadius: 8,
        hideUploadButton: true,
        sendBoxHeight: 80,
        fontSizeSmall: '80%',
        adaptiveCardActionFontSize: 80,
        suggestedActionBorderRadius: 8,
    };

    // -------------------
    // Email Checking
    // -------------------
    const [ email, setEmail ] = useState<string | undefined>(undefined);
    const [ showEmailPrompt, setShowEmailPrompt ] = useState(true);

    useEffect(() => {
        (async () => {
            const ret = await Preferences.get({ key: 'email' });
            const storedEmail = ret.value;
            console.log('Retrieved email from storage: ', storedEmail);

            setEmail(storedEmail ?? undefined);
            setShowEmailPrompt(!(storedEmail && storedEmail.length > 0));

            setIsLoading(false);
        })();
    }, []);


    // -------------------
    // Email Prompt Modal
    // -------------------
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [ emailInput, setEmailInput ] = useState('');

    const handleEmailChange = (e: CustomEvent<InputChangeEventDetail>) => {
        setEmailInput(e.detail.value || '');
    };

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    const onEmailProvided = async (email: string) => {
        await Preferences.set({ key: 'email', value: email });
        setEmail(email);
        setShowEmailPrompt(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            {
                isLoading ? (
                    <IonContent>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <IonSpinner></IonSpinner>
                        </div>

                    </IonContent>
                ) : (
                    <IonContent scrollY={false}>
                        {
                            email ? <ReactWebChat
                                    directLine={directLine}
                                    styleOptions={styleOptions}
                                    userID={email}
                                />
                                : <IonText>Please provide your email address to continue</IonText>
                        }
                        <IonModal ref={modal}
                                  isOpen={showEmailPrompt}
                                  onWillDismiss={(event) => onEmailProvided(event.detail.data)}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="end">
                                        <IonButton strong={true}
                                                   disabled={!emailInput}
                                                   onClick={() => confirm()}>
                                            Confirm
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent
                                className="ion-padding"
                                scrollY={false}
                            >
                                <IonText>Welcome to Vest, please enter your email address</IonText>
                                <IonItem>
                                    <IonInput ref={input}
                                              aria-label="email"
                                              type="email"
                                              placeholder="example@gmail.com"
                                              value={emailInput}
                                              onIonChange={handleEmailChange}/>
                                </IonItem>
                            </IonContent>
                        </IonModal>
                    </IonContent>
                )
            }
        </IonPage>
    );
};
