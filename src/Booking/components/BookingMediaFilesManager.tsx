import { useState } from "react";
import { IFileAndObjectUrl } from "../../file/components/MultipleFiles";
import { IonButton, IonCol, IonInput, IonItem, IonRow } from "@ionic/react";
import { ViewFile } from "../../file/components/ViewFile";
import { FileInputManager } from "../../file/components/FileInputManager";
import { AccessibilityCommunicationPreference } from "../../user/enums/accessibility";

export interface IBookingMediaFilesMANAGERProps {
  onCompletion: (fileObjs: (IFileAndObjectUrl & {copies: number})[]) => void;
  label?: string;
}

export const BookingMediaFilesManager = ({
  onCompletion,
  label,
}: IBookingMediaFilesMANAGERProps) => {
  const [selectedRawMediaFiles, setSelectedRawMediaFiles] = useState<
    (IFileAndObjectUrl & { copies: number })[]
  >([]);
  const [openEditRawFileCopiesTab, setOpenEditRawFileCopiesTab] =
    useState(false);
  const [currentRawFile, setCurrentRawFile] = useState<
    IFileAndObjectUrl & { copies: number }
  >();

  return (
    <>
      <IonRow>
        {selectedRawMediaFiles.map((mediaFile, index) => (
          <IonCol key={index} size="12" sizeSm="3" className="ion-text-center">
            <ViewFile
              fileObj={{
                attachmentType: mediaFile.file.type as string,
                attachmentUrl: mediaFile.objectUrl,
              }}
              label={mediaFile.file.name}
              onDeletion={(fileObj) => {
                setSelectedRawMediaFiles(
                  selectedRawMediaFiles.filter(
                    (item) => item.objectUrl !== fileObj.attachmentUrl
                  )
                );
                onCompletion(
                  selectedRawMediaFiles.filter(
                    (item) => item.objectUrl !== fileObj.attachmentUrl
                  )
                );
              }}
            />
            <div>{mediaFile.copies} copies </div>
          </IonCol>
        ))}
      </IonRow>
      <IonRow>
        <IonCol size="12">
          {openEditRawFileCopiesTab && currentRawFile && (
            <div style={{ maxWidth: "400px" }}>
              <ViewFile
                fileObj={{
                  attachmentType: currentRawFile.file.type,
                  attachmentUrl: currentRawFile.objectUrl,
                }}
              />
              <IonItem>
                <IonInput
                  type="number"
                  label="How many copies should be processed?"
                  labelPlacement="stacked"
                  placeholder="1"
                  value={currentRawFile.copies}
                  onIonInput={(evt) => {
                    setCurrentRawFile({
                      ...currentRawFile,
                      copies: Number(evt.detail.value || 1),
                    });
                  }}
                />
              </IonItem>
              <IonButton
                aria-label="Add Item"
                onClick={() => {
                  setSelectedRawMediaFiles([
                    ...selectedRawMediaFiles,
                    currentRawFile,
                  ]);
                  
                  onCompletion([
                    ...selectedRawMediaFiles,
                    currentRawFile,
                  ]);
                  
                  setOpenEditRawFileCopiesTab(false);
                }}
              >
                Add Item
              </IonButton>
            </div>
          )}
          <IonItem>
            <FileInputManager
              onCompletion={(fileObj) => {
                setCurrentRawFile({ ...fileObj, copies: 1 });
                setOpenEditRawFileCopiesTab(true);
              }}
              label={label || "Pick the document you want processed"}
              communicationPreference={
                AccessibilityCommunicationPreference.TEXT
              }
            />
          </IonItem>
        </IonCol>
      </IonRow>
    </>
  );
};
