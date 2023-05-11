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

import { Main } from './pages/Main';
import { AmplifyUser } from '@aws-amplify/ui';

setupIonicReact();

const App: React.FC = () => {
    const user = {
        username: 'STUB-USER-ID',
        attributes: {
            name: 'STUB-USER-NAME',
            email: 'STUB-USER-EMAIL',
            phone_number: 'STUB-USER-PHONE-NUMBER',
            birthdate: 'STUB-USER-BIRTHDATE',
            // picture: 'STUB-USER-PICTURE-URL'
        }
    } as unknown as AmplifyUser;

    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu/>
                    <IonRouterOutlet id="main">
                        <Route path="/home" exact={true}>
                            <Main user={user!}/>
                        </Route>
                        <Route path="/" exact={true}>
                            <Redirect to="/home"/>
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
