import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { HomeRoutes } from "../enums/routes";

export const Donate = () => {
  return (
    <section id="donate" className="home-sections">
      <IonGrid>
        <IonRow>
          <IonCol size="9">
            <p className="large-text">
              Like what we are doing? You subscribe to our updates or can contribute to this social
              development project by in your own ways, consider and apply disability accessibiitty and inclusion in your little circles.
            </p>
          </IonCol>
          <IonCol size="3">
            <p>
            </p>
            <p>
                <IonButton routerLink={HomeRoutes.CONTACT_US}>
                    Subscribe
                </IonButton>
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </section>
  );
};
