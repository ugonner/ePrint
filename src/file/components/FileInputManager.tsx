import { useState } from "react";
import { AccessibilityCommunicationPreference } from "../../user/enums/accessibility";
import { IFileAndObjectUrl } from "./MultipleFiles";
import { VoiceInput } from "./VoiceInput";
import CameraInput from "./CameraInput";
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { caretDown } from "ionicons/icons";
import { FileInput } from "./FileInput";

export interface IFileInputManagerProps {
  communicationPreference: AccessibilityCommunicationPreference;
  onCompletion: (fileObj: IFileAndObjectUrl) => void;
  onCancelAction?: () => void;
  label?: string;
}

export const FileInputManager = ({
  onCompletion,
  onCancelAction,
  label,
  communicationPreference,
}: IFileInputManagerProps) => {
  const [inputPreference, setInputPreference] = useState<
    AccessibilityCommunicationPreference | "All" | "File Picker" | "Camera"
  >(communicationPreference);

  return (
    <div>
      <h6>{label}</h6>
      <IonItem>
        {(inputPreference === "All" ||
          inputPreference === AccessibilityCommunicationPreference.VOICE) && (
          <VoiceInput
            onCompletion={onCompletion}
            onCancelAction={onCancelAction}
          />
        )}
        {(inputPreference === "All" ||
          inputPreference === AccessibilityCommunicationPreference.TEXT ||
          inputPreference === "Camera") && (
          <CameraInput onCompletion={onCompletion} />
        )}
        {(inputPreference === "All" ||
          inputPreference === AccessibilityCommunicationPreference.TEXT ||
          inputPreference === "File Picker") && (
          <FileInput onCompletion={onCompletion} />
        )}

        <div slot="end">
          <IonSelect
            title="choose input type"
            value={inputPreference}
            onIonChange={(evt) => {
              setInputPreference(evt.detail.value);
            }}
          >
            <IonSelectOption value={"All"}>All</IonSelectOption>
            <IonSelectOption value={AccessibilityCommunicationPreference.TEXT}>
              Camera
            </IonSelectOption>
            <IonSelectOption value={AccessibilityCommunicationPreference.VOICE}>
              Voice Note
            </IonSelectOption>
            <IonSelectOption value={"Camera"}>Camera</IonSelectOption>
            <IonSelectOption value={"File Picker"}>File Picker</IonSelectOption>
          </IonSelect>
        </div>
      </IonItem>
    </div>
  );
};
