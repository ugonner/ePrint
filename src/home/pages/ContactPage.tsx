// src/pages/Contact.tsx
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonIcon,
} from "@ionic/react";
import { useState } from "react";
import { BaseHeader } from "../../shared/components/partials/BaseHeader";
import { callOutline, compassOutline, logoWhatsapp } from "ionicons/icons";
import { BaseFooter } from "../../shared/components/partials/BaseFooter";

export const contactInfo: {label: string; value: string; icon: string}[] = [
        {label:"Phone", value: "234-703-466-7861", icon: callOutline},
        {label: "WhatsApp", value: "234-703-466-7861", icon: logoWhatsapp},
        {label: "Address", value: "Enugu-Onitsha Expressway, Awka. <br/> Anambra State. <br/> Nigeria.", icon: compassOutline}
    ];
    
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log({ name, email, message });
  };

  return (
    <IonPage>
        <BaseHeader title="About Us" />

      <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
            <IonCol size="12" sizeSm="7">
                  <h2 className="ion-text-center ion-text-bold">We’d Love to Hear From You</h2>
        <p className="ion-text-center">
          Reach out for partnerships, support programs, disability inclusion projects,
          research collaboration, or advocacy initiatives.
        </p>

        <IonItem>
          <IonLabel position="stacked">Full Name</IonLabel>
          <IonInput
            placeholder="Enter your name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Email Address</IonLabel>
          <IonInput
            type="email"
            placeholder="example@mail.com"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Message</IonLabel>
          <IonTextarea
            placeholder="How can we support you?"
            value={message}
            onIonChange={(e) => setMessage(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleSubmit}
        >
          Send Message
        </IonButton>

            </IonCol>
            <IonCol size="12" sizeSm="5">
<div className="ion-text-center ion-margin-top">
        <ContactCard />
        </div>
        
            </IonCol>
        </IonRow>
      </IonGrid>
      <BaseFooter />
      </IonContent>
    </IonPage>
  );
}

export const ContactCard = () => {
    return (
        <IonList>
            {
                contactInfo.map((item, index) => (
                    <IonItem key={index}>
                        <IonIcon icon={item.icon} />
                        <IonLabel className="ion-margin-horizontal">
                            <h6>{item.label}</h6>
                            <h3 dangerouslySetInnerHTML={{__html: item.value}}></h3>
                        </IonLabel>
                    </IonItem>
                ))
            }
        </IonList>
    )
}
