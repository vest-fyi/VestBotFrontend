import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
    helpCircleOutline,
    helpCircleSharp,
    homeOutline,
    homeSharp
} from 'ionicons/icons';
import './Menu.css';
import { Browser } from '@capacitor/browser';

interface AppPage {
    url?: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    onClick?: () => Promise<void>;
}

const appPages: AppPage[] = [
    {
        title: 'Home',
        url: '/home',
        iosIcon: homeOutline,
        mdIcon: homeSharp,
    },
    {
        title: 'Get Help',
        iosIcon: helpCircleOutline,
        mdIcon: helpCircleSharp,
        onClick: async () => {
            // await InAppBrowser.create(`https://www.notion.so/thevest/Help-f53d4712371147f59aadf0f258fb57a4?pvs=4`, '_blank', { presentationStyle: 'popover', hideToolbar: true });

            await Browser.open({
                url: 'https://thevest.notion.site/Help-f53d4712371147f59aadf0f258fb57a4',
                // presentationStyle: 'popover',
            });
        }
    }
];

const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            {/*TODO: bring content down*/}
            <IonContent>
                <IonList id="menu-list">
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={location.pathname === appPage.url ? 'selected' : ''}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                    onClick={appPage.onClick}
                                >
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
