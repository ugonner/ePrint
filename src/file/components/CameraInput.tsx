import React, { Dispatch, SetStateAction, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IFileAndObjectUrl } from "./MultipleFiles";
import { IonAvatar, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react";
import { camera } from "ionicons/icons";

export interface ICameraInputProps {
  onCompletion: (fileObj: IFileAndObjectUrl) => void;
  label?: string;
}

export default function CameraInput({
  onCompletion,
  label,
}: ICameraInputProps) {
  const [selectedFile, setSelectedFile] = useState<IFileAndObjectUrl | null>(
    null
  );
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    // Convert to file
    const file = await fetch(photo.webPath!)
      .then((r) => r.blob())
      .then(
        (blob) => new File([blob], `cam${Date.now()}camera-photo.jpg`, { type: blob.type })
      );

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);

    setSelectedFile({
      file,
      objectUrl,
    });

    onCompletion({
      file,
      objectUrl,
    });
  };

  return (
    <div>
        {label && (
            <IonItem>
                
          <IonLabel className="ion-margin-horizontal">
            <p>{label}</p>
          </IonLabel>
            </IonItem>
        )}
      <IonItem>
        <IonAvatar
          role="button"
          aria-label={label || "smap item to be processed"}
          onClick={takePhoto}
        >
          <IonIcon icon={camera} />
        </IonAvatar>
        {selectedFile && (
          <IonAvatar>
            <IonImg src={selectedFile.objectUrl} alt="picked image" />
          </IonAvatar>
        )}
      </IonItem>
    </div>
  );
}
