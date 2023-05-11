import { IonApp, IonButton, IonFooter, IonHeader, IonRouterOutlet, IonSplitPane, IonTitle, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Amplify, Auth } from 'aws-amplify';

// @ts-expect-error - aws-exports is not typed
import awsExports from "./aws-exports";
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Main } from './pages/Main';
import { useEffect } from 'react';

// rename the imported App from @capacitor/app to avoid confusion with our own App component
import {App as CapacitorApp} from '@capacitor/app';
import { Browser } from '@capacitor/browser';

Amplify.configure(awsExports);

setupIonicReact();

const App: React.FC = () => {
    // TODO: close browser when browser redirects to app URI after social sign in. get user state to skip authenticator
    // reference: https://ui.docs.amplify.aws/react/connected-components/authenticator/advanced
    // sample: https://github.com/aws-amplify/amplify-ui/issues/1977

    // // Get the callback handler from the Auth0 React hook
    // const { handleRedirectCallback } = useAuth0();
    //
    // const { authStatus } = useAuthenticator(context => [context.authStatus]);
    //
    // useEffect(() => {
    //     // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    //     CapacitorApp.addListener('appUrlOpen', async (data: any) => {
    //         console.log('appUrlOpened: ', data.url);
    //         console.log(await (Auth as any)._handleAuthResponse(data.url.replace('capacitor://', 'http://')))
    //
    //         // No-op on Android
    //         await Browser.close();
    //     });
    // }, []);

    return (
        <IonApp>
            <Authenticator signUpAttributes={[
                'name',
                'phone_number',
                'birthdate'
            ]} variation="modal">
                {({ signOut, user }) => (
                    <IonReactRouter>
                        <IonSplitPane contentId="main">
                            <Menu/>
                            <IonRouterOutlet id="main">
                                <Route path="/home" exact={true}>
                                    <Main user={user!} />
                                </Route>
                                <Route path="/" exact={true}>
                                    <Redirect to="/home"/>
                                </Route>
                            </IonRouterOutlet>
                        </IonSplitPane>
                    </IonReactRouter>
                )}
            </Authenticator>
        </IonApp>
    );
};

export default App;
