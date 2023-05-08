import {
    IonApp,
    IonButton,
    IonFooter,
    IonHeader,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

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
import Home from './pages/Home';
import React from 'react';

import '@aws-amplify/ui-react/styles.css';

import {
    withAuthenticator,
    WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// @ts-ignore
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';


const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
    localRedirectSignIn,
    productionRedirectSignIn,
] = awsExports.oauth.redirectSignIn.split(',');

const [
    localRedirectSignOut,
    productionRedirectSignOut,
] = awsExports.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
    ...awsExports,
    oauth: {
        ...awsExports.oauth,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
}



Amplify.configure(awsExports);

interface AppProps extends WithAuthenticatorProps {
    isPassedToWithAuthenticator: boolean;
}

setupIonicReact();

function App({ isPassedToWithAuthenticator, signOut, user }: AppProps) {
    // if (!isPassedToWithAuthenticator) {
    //     throw new Error(`isPassedToWithAuthenticator was not provided`);
    // }

    return (
        <IonApp>
            <IonHeader>
                <IonTitle>Hello, {user?.username}</IonTitle>
            </IonHeader>
            <IonFooter>
                <IonButton onClick={signOut}>Sign out</IonButton>
            </IonFooter>

            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        {/*<Route path="/" exact={true}>*/}
                        {/*    <Redirect to="/page/Inbox"/>*/}
                        {/*</Route>*/}
                        {/*<Route path="/page/:name" exact={true}>*/}
                        {/*    <Page/>*/}
                        {/*</Route>*/}
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>

        </IonApp>
    );

}

export default withAuthenticator(App);

export async function getStaticProps() {
    return {
        props: {
            isPassedToWithAuthenticator: true,
        },
    };
}
