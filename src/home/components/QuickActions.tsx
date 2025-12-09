import React, { useEffect, useRef, useState } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  useIonRouter,
  IonSpinner
} from "@ionic/react";
import {
  schoolSharp,
  printOutline,
  documentOutline,
  clipboardOutline,
  layersOutline,
  sparklesOutline,
  copyOutline,
  shapesOutline,
  scanOutline,
  shieldHalfOutline,
  laptopOutline,
} from "ionicons/icons";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import { BookingRoutes } from "../../Booking/enums/routes";
import { trainings } from "./TrainingTracks";
import "./QuickActions.css";
import { HomeRoutes } from "../enums/routes";
import { seedServices } from "../../aid-service/datasets/aidservices";

export interface IQuickActionButton {
  text: string;
  icon: string;
  routeLink: string;
}

const serviceIcons = [
  printOutline,
  documentOutline,
  clipboardOutline,
  layersOutline,
  shapesOutline,
  copyOutline,
  scanOutline
];

const ServiceQuickActions = () => {
  const router = useIonRouter();
  const {aidServicesRef} = useIInitContextStore();

  
const services = aidServicesRef.current?.length ? aidServicesRef.current : seedServices;
const serviceHomeItems: IQuickActionButton[] = services.map((item, index) => ({
  text: item.name,
  routeLink: `${BookingRoutes.BOOK_SERVICE}?asi=${item.id}`,
  icon: serviceIcons[index] || sparklesOutline
}));
const cn = 

serviceHomeItems.push({
  text: "Document Builder",
  icon: shieldHalfOutline,
  routeLink: HomeRoutes.HOME
})

trainings.forEach((training) => {
  serviceHomeItems.push({
    text: training.name,
    routeLink: training.routeLink,
    icon: laptopOutline
  })
});

  return (
    <>
    <IonRow>
      <IonCol size="12">
        <h4 className="ion-text-uppercase ion-text-danger">
          {
            (!aidServicesRef.current?.length) && (
              <IonSpinner />
            )
          }
          book services
        </h4>
      </IonCol>
    </IonRow>
     <IonRow>
          {serviceHomeItems.map((item, index) => (
            <IonCol size="6" key={index}>
              <IonCard
                button
                onClick={() => {
                  router.push(item.routeLink)
                }}
                className="service-card ion-text-center"
              >
                <IonCardHeader className="ion-text-center">
                  
                  <IonCardTitle>
                    <IonIcon icon={item.icon} size="large"></IonIcon>
                    <br/>
                    {item.text}
                    </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
    </>
  )
}

export default ServiceQuickActions;
