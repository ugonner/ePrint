import { Capacitor } from "@capacitor/core";
import { LocalStorageEnum } from "../../shared/enums";
import { IAppSettings } from "../../shared/interfaces/app-settings";
import { useLocalStorage } from "../../utils";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
} from "@ionic/react";
import { closeCircle, closeOutline, downloadSharp, lockOpenOutline } from "ionicons/icons";
import { HomeRoutes } from "../enums/routes";
import { useEffect, useState } from "react";
import { Browser } from "@capacitor/browser";
import { APIBaseURL, getData } from "../../shared/api/base";
import { IAppVersion } from "../../shared/interfaces/app-version";
import { appVersionId } from "../../App";

export const appDistFile = "";

export const DownloadApp = () => {
  const { getItem, setItem } = useLocalStorage();

  const appSettings = getItem<IAppSettings>(LocalStorageEnum.APP_SETTINGS);
  const [openAppUpdateOverlay, setOpenAppUpdateOverlay] = useState(false);

  const setAppSettings = () => {
    setItem<IAppSettings>(LocalStorageEnum.APP_SETTINGS, {
      ...(appSettings || {}),
      hideDownloadApp: !appSettings?.hideDownloadApp,
    });
    window.location.href = HomeRoutes.HOME;
  };

  const downloadApp = () => {
    try {
      const link: HTMLAnchorElement = document.createElement("a");
      if (link) {
        (link.download = "iDigiHub"), (link.href = appDistFile);
        link.click();
        setAppSettings();
      }
    } catch (error) {
      console.log("ERROR DOWNLOADING APP", (error as Error).message);
    }
  };

  useEffect(() => {
    getData<IAppVersion>(`${APIBaseURL}/notification/app-version`).then(
      (res) => {
        if (res.id != appVersionId) setOpenAppUpdateOverlay(true);
      }
    );
  }, []);
  return (
    <>
      {!Capacitor.isNativePlatform() && !appSettings?.hideDownloadApp && (
        <div className="ion-margin">
          <IonItem>
            <h5 className="large-text">If you like you can Download Mobile App here</h5>
            <IonButton size="large" slot="end" onClick={downloadApp}>
              <IonIcon className="ion-margin-horizontal" icon={downloadSharp} /> Download
            </IonButton>
            <IonButton
              size="large"
              className="ion-margin-horizontal"
              fill="clear"
              slot="end"
              onClick={() => setAppSettings}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonItem>
        </div>
      )}
      <IonModal
        isOpen={openAppUpdateOverlay}
        onDidDismiss={() => setOpenAppUpdateOverlay(false)}
      >
        <IonContent className="ion-padding">
          <IonItem>
            <IonIcon
              role="button"
              aria-label="close"
              onClick={() => setOpenAppUpdateOverlay(false)}
              slot="end"
              icon={closeCircle}
            />
          </IonItem>
          <div className="ion-margin">
            <h2 className="ion-text-bold">Update Available!</h2>
            <p>
              There is a new update available with better features. Plwase
              update
            </p>
            <IonButton
              role="link"
              className="ion-margin"
              expand="full"
              onClick={() => {
                setOpenAppUpdateOverlay(false);
                Browser.open({ url: appDistFile });
              }}
            >
              Update
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};
