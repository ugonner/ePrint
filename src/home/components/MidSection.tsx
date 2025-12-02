import { IonCol, IonGrid, IonImg, IonItem, IonRow, isPlatform } from "@ionic/react";
import { featureItems, IOnboardingItem } from "./launch-screens/Onboarding";

export const longSectionItems = [
  {
      image: "/images/sidebars/side-bar-2.webp",
  
  },
  {
    image: "/images/sidebars/side-bar-4.png",
  
  },
  {
     image: "/images/sidebars/side-bar-1.jpg",
  
  }
];

const sectionItems: (IOnboardingItem & {image: string;})[] = featureItems.map((item, index) => ({
  ...item, image: (longSectionItems[index].image || longSectionItems[0].image)
}));

export const MidSection = () => {
  

  return (
    <section id="features" className="home-sections">
       <IonGrid>
      {sectionItems.map((item, index) => (
        <IonRow key={index}>
          {
            isPlatform("desktop") ? (
              <>
              {index % 2 === 1 && (
            <>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.header}</p>
                <p>{item.detail}</p>
              </IonCol>
              
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.header} />
                </IonItem>
              </IonCol>
            </>
          )}
          {index % 2 === 0 && (
            <>
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.header} />
                </IonItem>
              </IonCol>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.header}</p>
                <p>{item.detail}</p>
              </IonCol>
            </>
          )}
              </>
            ) : (
               <>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.header}</p>
                <p>{item.detail}</p>
              </IonCol>
              
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.header} />
                </IonItem>
              </IonCol>
            </>
            )
          }
        </IonRow>
      ))}
    </IonGrid>

    </section>
  );
};
