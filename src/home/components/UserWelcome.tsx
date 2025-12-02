import { IonAvatar, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonRow, useIonAlert, useIonRouter } from "@ionic/react";
import { useLocalStorage } from "../../utils"
import { IAuthUserProfile } from "../../user/interfaces/user";
import { LocalStorageEnum } from "../../shared/enums";
import { person } from "ionicons/icons";
import { UserRoutes } from "../../user/enums/routes.enum";

export const UserWelcome = () => {
    const {getItem} = useLocalStorage();
    const [presentAlert] = useIonAlert();
    const router = useIonRouter();

    const user = getItem<IAuthUserProfile>(LocalStorageEnum.USER);
    return (
        <IonRow>
            <IonCol size="12">
                <IonItem routerLink={UserRoutes.PROFILE}>
                    <IonAvatar>
                        {
                            user?.profile?.avatar ? (
                                <IonImg src={user.profile.avatar} alt="profile" />
                            ): (
                                <IonIcon icon={person} />
                            )
                        }
                    </IonAvatar>
                    <IonLabel className="ion-margin-horizontal">
                        <h3>Hi, {user?.profile?.firstName || ""}</h3>
                        <p>
                            How can we help you today with easy accessibility and inclusive service?
                        </p>
                        <p>
                            Remember to do a thing for disability inclusive society today
                        </p>
                    </IonLabel>
                </IonItem>
            </IonCol>
        </IonRow>
    )
}