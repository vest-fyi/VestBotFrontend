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
import ReactWebChat, { createDirectLine, hooks } from 'botframework-webchat';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Main.css';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import Composer from 'botframework-webchat-component/lib/Composer';
import BasicWebChat from 'botframework-webchat-component/lib/BasicWebChat';

export const Main: React.FC = () => {
    const [ isLoading, setIsLoading ] = useState(true);

    // -------------------
    // Bot Framework Web Chat Config
    // -------------------
    let secret: string;
    switch (import.meta.env.VITE_STAGE) {
        case 'local':
            // secret = 'zJUsj4KeL1A.0jzAbVoRak8l8uRgUUyCMWoXShGj8Up4ewR3_eityX4';
            secret = 'zJUsj4KeL1A.AgunaiRg-pspAKxuRp2iYqqOJF6B6fw0J-Zh_3SNI5g';
            break;
        case 'beta':
            // secret: '89Et2XauBY8.NLUFJiExmvbNiPLmpG51ECssq6LqV1WvHoatqEY_q-A'
            secret: '89Et2XauBY8.6IpmRylqRtyyFdIyL800zI66bclIE6Zjj-AN7Wgtsj0';
            break;
        case 'gamma':
        case 'prod':
        default:
            secret = 'INVALID';
            break;
    }
    const directLine = useMemo(() => createDirectLine({ secret }), []);

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

    // -------------------
    // Send transcript when app is closed
    // -------------------
    App.addListener('appStateChange', async ({ isActive }) => {
        if (isActive) {
            return;
        }

        const taskId = await BackgroundTask.beforeExit(async () => {
            console.log('Sending transcript before app close');

            const { useSendMessage } = hooks;
            const sendMessage = useSendMessage();
            sendMessage(JSON.stringify({
                feedback: 'NONE'
            }));

            BackgroundTask.finish({ taskId });
        });
    });

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
                            email ?
                                // <ReactWebChat
                                //     directLine={directLine}
                                //     styleOptions={styleOptions}
                                //     userID={email}
                                // />
                                <Composer directLine={directLine}
                                          styleOptions={styleOptions}
                                            userID={email}
                                >
                                    <BasicWebChat />
                                </Composer>

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
