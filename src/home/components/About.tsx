import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { arrowForward, helpSharp } from "ionicons/icons";
import { HomeRoutes } from "../enums/routes";

export const About = () => {
  return (
    <section id="about" className="home-sections">
      <div
        style={{
          backgroundColor: "black",
          padding: "50px",
        }}
      >
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="7">
              <div>
                <h4 className="ion-text-danger ion-text-bold ion-text-uppercase">
                  What About iDigiHub <IonIcon icon={helpSharp} />{" "}
                </h4>
                <p className="large-text">
                  African Diaspora Disability Collective Representative
                </p>
                <p>
                  iDigiHub is a modern digital service platform designed to make
                  everyday document processing simple, accessible, and
                  stress-free for everyone—including persons with disabilities
                  (PWDs). We believe that essential services such as printing,
                  photocopying, scanning, lamination, and basic data processing
                  should be available to all, regardless of physical location or
                  mobility challenges. Our platform removes the need for long
                  queues or travel by bringing these services directly to users
                  through an intuitive and user-friendly web app.
                </p>
                <p>
                  <IonButton routerLink={HomeRoutes.ABOUT_US}>
                    Know More <IonIcon icon={arrowForward} />
                  </IonButton>
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="5"></IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
