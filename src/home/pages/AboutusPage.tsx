// src/pages/About.tsx
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { BaseHeader } from "../../shared/components/partials/BaseHeader";
import { compassSharp } from "ionicons/icons";
import { NavigationBarGap } from "../../shared/components/partials/NavigationBarGap";
import { BaseFooter } from "../../shared/components/partials/BaseFooter";


export const aboutText1 = `
iDigiHub is a modern digital service platform designed to make
                  everyday document processing simple, accessible, and
                  stress-free for everyone—including persons with disabilities
                  (PWDs). We believe that essential services such as printing,
                  photocopying, scanning, lamination, and basic data processing
                  should be available to all, regardless of physical location or
                  mobility challenges. Our platform removes the need for long
                  queues or travel by bringing these services directly to users
                  through an intuitive and user-friendly web app.
               
`;
export const aboutText2 = `
At iDigiHub, we are committed to bridging the digital gap by combining convenience with empowerment. Beyond providing document services on demand, we offer basic computer appreciation training to help users build digital confidence and productivity. Whether you're a student, professional, entrepreneur, or a person with special accessibility needs, our goal is to support your growth with tools that make technology easy to understand and use
`;

const aboutText3 = `
We also provide creative automation tools, allowing users to instantly generate documents such as birthday cards, letters, certificates, and other everyday templates. iDigiHub is more than a service platform—it is a commitment to inclusive innovation. Our mission is to ensure that everyone, regardless of ability or circumstance, can access reliable digital services and enjoy true independence in their daily tasks`
;

export const objectives = [
  "To provide fast, accessible, and reliable document processing services to all users, including persons with disabilities.",
  "To simplify digital tasks by offering on-demand printing, photocopying, scanning, and lamination services delivered to users' doorsteps.",
  "To empower individuals with basic computer literacy and digital skills through guided online and offline training.",
  "To offer automated tools for generating personalized documents, enhancing productivity and creativity for everyday use."
];

const mission = "To deliver inclusive, user-friendly, and accessible digital services that empower individuals—especially persons with disabilities—to accomplish everyday document and data tasks with ease, convenience, and independence.";
const vision = "To become the leading digital service hub that bridges accessibility gaps, promotes digital empowerment, and transforms how communities access essential document services and creative tools.";

export default function AboutUsPage() {
  return (
    <IonPage>
      <BaseHeader title="Contact Us" />

      <IonContent className="ion-padding">
        <h1 className="ion-text-center ion-text-bold ion-margin-bottom extra-large-text">
          Inclusive Digital Hub, (iDigiHub)
        </h1>

        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeSm="7">
              <div>
                <p> {aboutText1} </p>

                <p>
                  We champion homegrown innovation by supporting the creation of
                  inclusive technologies, accessible designs, community
                  rehabilitation, and disability-led entrepreneurship. Our
                  mission empowers people with disabilities to become leaders,
                  innovators, and creators rather than mere beneficiaries of
                  aid.
                </p>

                <p>
                 {aboutText2}
                </p>

                <p>
              {aboutText3}.
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="5">
              <div>
                <IonItem>
                  <IonImg src={"/favicon.png"} alt="logo" />
                </IonItem>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeSm="7">
              <div>
                <p className="ion-text-danger ion-text-uppercase">Objectives</p>
              </div>
              <div
                className="ion-margin ion-padding"
                style={{
                  borderLeft: "4px solid white",
                }}
              >
                {objectives.map((obj, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                    }}
                  >
                    <div className="ion-text-center">
                      <IonIcon size="large" icon={compassSharp} />
                    </div>
                    <div style={{ marginLeft: "5px" }}>
                      <p>{obj}</p>
                    </div>
                  </div>
                ))}
              </div>
            </IonCol>
            <IonCol size="12" sizeSm="5">
              <div>
                <p className="ion-text-uppercase ion-text-danger">
                  <span>Vision and Mission</span>
                  <h6 className="ion-text-capitalize">
                    Here is the vision and mission statements guiding our
                    operations and policies
                  </h6>
                </p>
                <p>
                  VISION:
                  <br />{vision}
                </p>
                <p>
                  MISSION: <br />
                   {mission}
                  </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <NavigationBarGap />
        <BaseFooter />
      </IonContent>
    </IonPage>
  );
}
