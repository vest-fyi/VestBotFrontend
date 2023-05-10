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
import { Amplify } from 'aws-amplify';

// @ts-expect-error - aws-exports is not typed
import awsExports from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Main } from './pages/Main';

Amplify.configure(awsExports);

setupIonicReact();

const App: React.FC = () => {
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
