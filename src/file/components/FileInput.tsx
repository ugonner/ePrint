import { LegacyRef, useRef, useState } from "react";
import { IFileAndObjectUrl } from "./MultipleFiles";
import { IonAvatar, IonIcon, IonImg, IonItem } from "@ionic/react";
import { cloudUploadSharp } from "ionicons/icons";

export interface IFileInputProps {
  onCompletion: (fileObj: IFileAndObjectUrl) => void;
  label?: string;
}

export const FileInput = ({ onCompletion, label }: IFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = useState<IFileAndObjectUrl | null>(
    null
  );
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef as LegacyRef<HTMLInputElement>}
        onChange={(evt) => {
          if (evt.target.files?.length) {
            const file = evt.target.files[0];
            const objectUrl = URL.createObjectURL(new Blob([file]));
            onCompletion({ file, objectUrl });
          }
        }}
        hidden={true}
      />
      {label}
      <IonItem>
        <IonAvatar
          role="button"
          aria-label={label || "select a file or document"}
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
        >
          <IonIcon icon={cloudUploadSharp} />
        </IonAvatar>
        {selectedFile && (
          <IonAvatar>
            <IonImg src={selectedFile.objectUrl} alt="picked file" />
          </IonAvatar>
        )}
      </IonItem>
    </div>
  );
};
