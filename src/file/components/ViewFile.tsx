import { IonIcon, IonImg, IonItem } from "@ionic/react";
import { IAttachment } from "../typings/typings";
import { downloadSharp, trashSharp } from "ionicons/icons";
import { useFileHandler } from "../hooks/file";
import { BookingDTO } from "../../Booking/dtos/booking.dto";

export interface IViewFileProps {
  fileObj: IAttachment;
  onDeletion?: (fileObj: IAttachment) => void;
  label?: string;
  fileName?: string;
  isLocal?: boolean;
}

export const ViewFile = ({
  fileObj,
  onDeletion,
  label,
  fileName,
  isLocal,
}: IViewFileProps) => {
  const { downloadFile } = useFileHandler();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <div style={{ width: "95%" }}>
        <small>{label}</small>
        {/image/i.test(fileObj.attachmentType) && (
          <img
            src={fileObj.attachmentUrl}
            alt="preview"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
        {/audio/i.test(fileObj.attachmentType) && (
          <audio
            style={{
              width: "100%",
            }}
            src={fileObj.attachmentUrl}
            content="preview"
            controls
          />
        )}
        {/video/i.test(fileObj.attachmentType) && (
          <video
            style={{
              width: "100%",
              height: "auto",
            }}
            src={fileObj.attachmentUrl}
            controls
          />
        )}
        {!/(image|audio|video)/.test(fileObj.attachmentType) && (
          <embed
            src={fileObj.attachmentUrl}
            style={{
              width: "100%",
            }}
          />
        )}
      </div>
      <div className="ion-text-center">
        {onDeletion && (
          <div>
            <IonIcon
              role="button"
              aria-label="delete item"
              onClick={() => {
                if (onDeletion) onDeletion(fileObj);
              }}
              icon={trashSharp}
            />
          </div>
        )}
        <div>
          <IonIcon
            role="button"
            aria-label="delete item"
            onClick={() => {
              downloadFile({
                url: fileObj.attachmentUrl,
                name: fileName || label?.replace(" ", "_") || "",
                isLocal,
              });
            }}
            icon={downloadSharp}
          />
        </div>
      </div>
    </div>
  );
};
