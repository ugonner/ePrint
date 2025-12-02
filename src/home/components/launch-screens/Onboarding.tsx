import {
  IonAvatar,
  IonButton,
  IonIcon
} from "@ionic/react";
import { useState } from "react";
import { HomeRoutes } from "../../enums/routes";
import { useLocalStorage } from "../../../utils";
import { IAppSettings } from "../../../shared/interfaces/app-settings";
import { LocalStorageEnum } from "../../../shared/enums";
import { carOutline, laptopOutline, printOutline } from "ionicons/icons";

export interface IOnboardingItem {
  detail: string;
  header: string;
  icon: string;
}
export const featureItems: IOnboardingItem[] = [
  {
    header: "Request Print & Copy Services",
    detail:
      "Easily request printing, photocopying, scanning, and lamination services right from your phone. Our platform ensures persons with disabilities and all users can access high-quality document processing without any stress.",
    icon: printOutline
  },
  {
    header: "Fast Home Delivery",
    detail:
      "Completed documents are delivered straight to your doorstep. Whether you are at home, at work, or on the move, we ensure a seamless experience for users including PWDs.",
    icon: carOutline
  },
  {
    header: "Basic Computer Training",
    detail:
      "Get guided training on digital literacy and basic computer appreciation, empowering users—especially persons with disabilities—to improve their productivity and independence.",
    icon: laptopOutline
  },
];

export const OnBoarding = () => {

  const { setItem, getItem } = useLocalStorage();
const onboardingItems: IOnboardingItem[] = featureItems.slice(0, 3);
const finalItem = onboardingItems[onboardingItems.length - 1];

  const [pageNumber, setPageNumber] = useState(0);
  const item = onboardingItems[pageNumber];

  return (
    <div
      style={{
        textAlign: "center",
        textTransform: "capitalize",
        fontWeight: "bold",
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1 style={{ fontWeight: "bolder" }}>Welcome To FlexMedCare&trade;</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {item && (
          <div>
            <div style={{ fontSize: "4em" }}>
              <IonIcon icon={item.icon}></IonIcon>
            </div>
            <h2 style={{ fontWeight: "bolder" }}>{item.header}</h2>
            <p>{item.detail}</p>
          </div>
        )}
        {!item && (
          <div>
            <div style={{ fontSize: "4em" }}>
              <IonIcon icon={finalItem.icon}></IonIcon>
            </div>
            <h2 style={{ fontWeight: "bolder" }}>{finalItem.header}</h2>
            <p>{finalItem.detail}</p>
          </div>
        )}
      </div>
      <div>
        <p>
          By joining us, you agree to our Terms and Conditions at FlexMedCare
        </p>
      </div>
      <div
        className="ion-padding"
        style={{
          position: "absolute",
          bottom: "3%",
          left: "4$",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            {onboardingItems[pageNumber - 1] && (
              <span role="button" onClick={() => setPageNumber(pageNumber - 1)}>
                Back
              </span>
            )}
          </div>
          <div>
            {!item && (
              <IonButton
                shape="round"
                onClick={() => {
                  let appSettings: IAppSettings | null = getItem<IAppSettings>(
                    LocalStorageEnum.APP_SETTINGS
                  );
                  appSettings = { ...(appSettings || {}), isOldUser: true };
                  setItem(LocalStorageEnum.APP_SETTINGS, appSettings);
                  window.location.href = HomeRoutes.HOME;
                }}
              >
                Get Started
              </IonButton>
            )}
          </div>

          <div>
            {item && (
              <span
                role="button"
                onClick={() => {
                  if (onboardingItems[pageNumber + 1])
                    setPageNumber(pageNumber + 1);
                  else setPageNumber(onboardingItems.length);
                }}
              >
                Next
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
