import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import {
  checkmarkDoneCircleOutline,
  globeOutline,
  people,
  peopleOutline,
  settingsOutline,
} from "ionicons/icons";

export const statsItems = [
  {
    label: "Global Partnerships",
    icon: globeOutline,
    value: 1,
  },
  {
    label: "Completed Projects",
    icon: checkmarkDoneCircleOutline,
    value: 33,
  },
  {
    label: "In-Progress",
    icon: settingsOutline,
    value: 24,
  },
  {
    label: "Communities",
    icon: peopleOutline,
    value: 23,
  },
];
export const Stats = () => {
  return (
    <section id="stats" className="home-sections">
      <div>
        <IonGrid>
          <IonRow>
            {statsItems.map((item, index) => (
              <IonCol
                size="6"
                sizeSm="3"
                key={index}
                className="ion-text-center ion-margin-vertical"
              >
                <span className="large-text">
                  <IonIcon icon={item.icon} />
                </span>
                <br />
                <span className="extra-large-text">{item.value}+</span>
                <br />
                <span>{item.label}</span>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
