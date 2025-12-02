import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonRow,
} from "@ionic/react";
import { IProfile } from "../../user/interfaces/user";
import { defaultUserImageUrl } from "../../shared/DATASETS/defaults";

export interface ITeamProps {
  profiles: IProfile[];
}
const africanImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  "https://images.unsplash.com/photo-1553514029-1318c9127859",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9"
];
export const SampleProfile: IProfile = {
  id: 1,
  userId: "",
  firstName: "Engr. Bon",
  lastName: "Ugo",
};
export const teamMembers: IProfile[] = [
  {
    id: 1,
    userId: "",
    firstName: "Barr. Chux",
    lastName: "Eze",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    profilePosition: {
      profile: SampleProfile,
      position: {
        name: "Legal Adviser",
      },
      positionNote: "Chairman, Disabiity Rights Commission. Disability Rights Lawyer",
    },
  },
  {
    id: 2,
    userId: "",
    firstName: "Engr. Bon",
    lastName: "Ugo",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
   profilePosition: {
      profile: SampleProfile,
      position: {
        name: "Chief Technical Officer",
      },
      positionNote: "Expert Software Developer",
    },
  },
  
  {
    id: 2,
    userId: "",
    firstName: "Amara",
    lastName: "Okorie",
    avatar: "https://i.ibb.co/99FxJ5C/african-woman-smile.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Executive Director" },
      positionNote: "Advocate for disability rights & diaspora partnerships",
    },
  },
  {
    id: 3,
    userId: "",
    firstName: "Kwame",
    lastName: "Mensah",
    avatar: "https://i.ibb.co/yS7G7Gq/young-african-man.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Head of Innovation" },
      positionNote: "Develops tech and adaptive solutions for PWDs",
    },
  },
  {
    id: 4,
    userId: "",
    firstName: "Zainab",
    lastName: "Bello",
    avatar: "https://i.ibb.co/28D6gpV/beautiful-african-woman.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Director of Advocacy" },
      positionNote: "Leads policy engagement & disability inclusion campaigns",
    },
  },
  {
    id: 5,
    userId: "",
    firstName: "Tunde",
    lastName: "Ajayi",
    avatar: "https://i.ibb.co/Zcqs6Mg/african-businessman.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Program Manager" },
      positionNote: "Coordinates diaspora-led support projects in Africa",
    },
  },
  {
    id: 6,
    userId: "",
    firstName: "Aisha",
    lastName: "Kaduna",
    avatar: "https://i.ibb.co/8xcnmkB/young-african-woman.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Head of Education & Inclusion" },
      positionNote: "Designs inclusive learning programs for PWDs",
    },
  },
  {
    id: 7,
    userId: "",
    firstName: "Joseph",
    lastName: "Eke",
    avatar: "https://i.ibb.co/TLZC6R0/african-man-smiling.jpg",
    profilePosition: {
      profile: SampleProfile,
      position: { name: "Finance and Grants Director" },
      positionNote: "Manages funding and diaspora grant partnerships",
    },
  }
];

export const Team = ({ profiles }: ITeamProps) => {
  profiles = teamMembers;
  const leftTeam = profiles.slice(0, 4);
  const rightTeam = profiles.slice(4);

  return (
    <section id="team" className="home-sections">
          <div
    style={{
        backgroundColor: "black",
    }}
    >
      <div>
        <div className="ion-text-center">
            <p className="large-text">The Team</p>
            <p className="small-text">These are our top experts</p>
        </div>
        <div>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeSm="4">
                {leftTeam.map((profile, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "40px"
                    }}
                  >
                    <div>
                      <h3>{profile.firstName}</h3>
                      <p>
                        <p>
                          Position: {profile.profilePosition?.position?.name}
                        </p>
                        <p>{profile.profilePosition?.positionNote}</p>
                      </p>
                    </div>
                    <div>
                      <IonItem>
                        <IonAvatar>
                          <IonImg
                            src={profile.avatar || defaultUserImageUrl}
                            alt={profile.firstName}
                          />
                        </IonAvatar>
                      </IonItem>
                    </div>
                  </div>
                ))}
              </IonCol>
              <IonCol size="12" sizeSm="4" className="ion-margin-vertical ion-text-center">
                <div
                style={{
                    width: "100%",
                    height: "90%"
                }}>
                    <img 
                    src="/favicon.png"
                    alt="ceo"
                    style={{
                        width: "100%",
                        height: "90%"
                    }}
                    />
                </div>
                <h3>Founder</h3>
                <p>Mrs. Rita Evans.</p>
              </IonCol>
              <IonCol size="12" sizeSm="4">
                {rightTeam.map((profile, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "40px"
                    }}
                  >
                    
                    <div>
                      <IonItem>
                        <IonAvatar>
                          <IonImg
                            src={profile.avatar || defaultUserImageUrl}
                            alt={profile.firstName}
                          />
                        </IonAvatar>
                      </IonItem>
                    </div>
                    <div>
                      <h3>{profile.firstName}</h3>
                      <p>
                        <p>
                          Position: {profile.profilePosition?.position?.name}
                        </p>
                        <p>{profile.profilePosition?.positionNote}</p>
                      </p>
                    </div>
                  </div>
                ))}
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </div>

    </section>
);
};
