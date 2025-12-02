import { Browser } from "@capacitor/browser";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { folderOpen, walkSharp } from "ionicons/icons";

export interface ITrainingProgram {
  name: string;
  description: string;
  routeLink: string;
  icon: string;
}

export const trainings: ITrainingProgram[] = [
  {
    name: "Inclusive Computer Trainings",
    description:
      "This program builds the capacity of trainees on the ICT skills to be most productive, programs are planned to also cater for all persons and also the accessibility needs of person with disabilities",
    icon: walkSharp,
    routeLink: "https://docs.google.com/forms/d/e/1FAIpQLSclhMtbZ4n_W2iRef7NkRZvxh7OfbotwM2hrFvY6mDpz2sfKw/viewform?usp=publish-editor",
  },
  {
    name: "Digital Inclusion technologies training ",
    description:
      "This program provides capacity and professional consultancy of available and innovative ICT solutions and softwares for better inclusion and effeciency",
    icon: folderOpen,
    routeLink: "https://docs.google.com/forms/d/e/1FAIpQLSclhMtbZ4n_W2iRef7NkRZvxh7OfbotwM2hrFvY6mDpz2sfKw/viewform?usp=publish-editor",
  },
];

export const TrainingTracks = () => {
  return (
    <section id="training-tracks" className="home-sections">
      <div className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <p className="ion-text-uppercase ion-text-danger">
                Training Tracks
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            {trainings.map((training, index) => (
              <IonCol key={index} size="12" sizeSm="6">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <h2 className="ion-text-capitalize large-text">
                      <IonIcon icon={training.icon} size="large" />
                    </h2>
                  </div>
                  <div>
                    <h2 className="ion-text-capitalize large-text">
                      <span className="ion-margin-horizontal">
                        {training.name}
                      </span>
                    </h2>
                  </div>
                </div>
                <p>{training.description}</p>
                <p>
                  <IonButton
                    onClick={() => Browser.open({ url: training.routeLink })}
                  >
                    Join Program
                  </IonButton>
                </p>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
