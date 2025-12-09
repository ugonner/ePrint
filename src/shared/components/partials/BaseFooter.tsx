import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonRow,
  isPlatform,
} from "@ionic/react";
import { useIInitContextStore } from "../../contexts/InitContextProvider";
import {
  arrowUpOutline,
  barChartOutline,
  compassOutline,
  fileTrayOutline,
  globeOutline,
  home,
  homeOutline,
  peopleOutline,
  pinOutline,
  shapesOutline,
} from "ionicons/icons";
import { HomeRoutes } from "../../../home/enums/routes";
import { INavigationButton } from "../menus/BaseMenu";
import { ContactCard } from "../../../home/pages/ContactPage";
import { AidServiceRoutes } from "../../../aid-service/enums/routes";
import { aboutText1 } from "../../../home/pages/AboutusPage";
import { Capacitor } from "@capacitor/core";

  export const navItems: INavigationButton[] = [
    {
      id: 1,
      icon: homeOutline,
      routeLink: HomeRoutes.HOME,
      label: "Home",
    },
    {
      id: 2,
      icon: fileTrayOutline,
      routeLink: HomeRoutes.ABOUT_US,
      label: "About iDigiHub",
    },
    {
      id: 3,
      icon: pinOutline,
      routeLink: AidServiceRoutes.AID_SERVICE_ALL,
      label: "Service Areas",
    }
  ];

  const quickLinks: INavigationButton[] = [
    {
      id: 1,
      label: "The Team",
      routeLink: `${HomeRoutes.HOME}#team`,
      icon: peopleOutline,
    },
    {
      id: 2,
      label: "Statistics",
      routeLink: `${HomeRoutes.HOME}#stats`,
      icon: barChartOutline,
    },
    {
      id: 3,
      label: "Partners",

      routeLink: `${HomeRoutes.HOME}#partners`,
      icon: globeOutline,
    },
    {
      id: 5,
      label: "Mission Statements",
      routeLink: `${HomeRoutes.HOME}#mission-statements`,
      icon: arrowUpOutline,
    },
  ];

export const BaseFooter = () => {
  
  return (
    <>
    {
      (Capacitor.isNativePlatform()) ? (
       <div></div>

      ): (
          <footer id="base-footer" className="home-sections">
      <div>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="3">
              <div className="ion-margin">
                <p>
                  <span className="ion-text-danger ion-text-uppercase">
                    About iDigiHub
                  </span>
                  <h6>Brief about iDigiHub, you can also view more below</h6>
                </p>

                <p>
                {aboutText1.substring(0, 150)}.
                </p>
                <p>
                  <IonButton routerLink={HomeRoutes.ABOUT_US}>
                    Know More
                  </IonButton>
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="3">
              <div className="ion-margin">
                <p>
                  <span className="ion-text-danger ion-text-uppercase">
                    Easy Navigation
                  </span>

                  <h6 className="ion-text-cap">
                    Use these quick links to access more.
                  </h6>
                </p>
                {navItems.map((item, index) => (
                  <IonItem key={index} routerLink={item.routeLink}>
                    <span>
                      {" "}
                      <IonIcon icon={item.icon} />{" "}
                    </span>
                    <span className="ion-margin">{item.label}</span>
                  </IonItem>
                ))}
              </div>
            </IonCol>

            <IonCol size="12" sizeSm="3">
              <div className="ion-margin">
                <p>
                  <span className="ion-text-danger ion-text-uppercase">
                    Feature Access
                  </span>

                  <h6 className="ion-text-cap">
                    Access feature sections on our base page.
                  </h6>
                </p>

                {quickLinks.map((quickLink, index) => (
                  <IonItem key={index} routerLink={quickLink.routeLink}>
                    <span>
                      {" "}
                      <IonIcon icon={quickLink.icon} />{" "}
                    </span>
                    <span className="ion-margin">{quickLink.label}</span>
                  </IonItem>
                ))}
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="3">
                <div className="ion-margin">
                <p>
                  <span className="ion-text-danger ion-text-uppercase">
                    Contact
                  </span>

                  <h6 className="ion-text-cap">
                    We will love to engage with you through our contacts below.
                  </h6>
                </p>
                <ContactCard />
                </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
                <div className="ion-text-center extra-small-text">
                    Powered By AppLaws IT&trade;
                </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </footer>
      )
    }
    </> 
  );
};
