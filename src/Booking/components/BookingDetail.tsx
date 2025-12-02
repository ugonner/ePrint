import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { IBooking, IBookingMediaFile } from "../interfaces/booking";
import { BookingActionsMenu } from "./BookingActionsMenu";
import { BookingCard } from "./BookingCard";
import { LocationAddressCard } from "./LocationAddress";
import { VirtualLocationAddressCard } from "./VirtualLocationManager";
import { getBookingFields } from "../datasets/booking-fields";
import { closeCircle, squareSharp, starSharp } from "ionicons/icons";
import { formatCamelCaseToSentence } from "../../shared/helpers";
import { AidServiceProfileCard } from "../../aid-service/components/AidServiceProfileCard";
import { getNumberRange } from "../../shared/components/form/DateSelector";
import { formatCurrency, useLocalStorage } from "../../utils";
import { IAuthUserProfile } from "../../user/interfaces/user";
import { LocalStorageEnum } from "../../shared/enums";
import { useState } from "react";
import { ViewFile } from "../../file/components/ViewFile";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { IFileAndObjectUrl } from "../../file/components/MultipleFiles";
import { uploadFiles } from "../../file/utils/filehooks";
import { APIBaseURL, postData } from "../../shared/api/base";
import { BookingMediaFilesManager } from "./BookingMediaFilesManager";
import { BookingRoutes } from "../enums/routes";
import { DeliveryType } from "../enums/booking";

export interface IBookingDetailProps {
  booking: IBooking;
}

export const BookingDetail = ({ booking }: IBookingDetailProps) => {
  const router = useIonRouter();
  const { getItem } = useLocalStorage();

  const authUser = getItem<IAuthUserProfile>(LocalStorageEnum.USER);
  const [openManageProccessedFilesOverlay, setOpenManageProcessedFilesOverlay] =
    useState(false);

  const advancedBookingFields = getBookingFields(booking, true);
  const ratingRange = getNumberRange(1, booking.rating || 1);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="11">
            <BookingCard booking={booking} />
          </IonCol>
          <IonCol size="1">
            <BookingActionsMenu booking={booking} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeSm="6">
            <LocationAddressCard locationAddress={booking.locationAddress} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="6">
            {advancedBookingFields.slice(0, 5).map((item, index) => (
              <IonItem key={index}>
                <IonAvatar>
                  <IonIcon icon={item.icon || squareSharp}></IonIcon>
                </IonAvatar>
                <IonLabel>
                  <h3>{formatCamelCaseToSentence(item.name)}</h3>
                  <p>{item.value as string}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonCol>
          <IonCol size="6">
            {advancedBookingFields.slice(5).map((item, index) => (
              <IonItem key={index}>
                <IonAvatar>
                  <IonIcon icon={item.icon || squareSharp}></IonIcon>
                </IonAvatar>
                <IonLabel>
                  <h3>{formatCamelCaseToSentence(item.name)}</h3>
                  <p>{item.value as string}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeSm="6">
            <h4>Additional Detail</h4>
            <p>Booking Note </p>
            <p>{booking.bookingNote}</p>
            {booking.descriptionMedia && (
              <div>
                <h5>Additional Document to further guide us</h5>
                <ViewFile fileObj={booking.descriptionMedia} />
              </div>
            )}
          </IonCol>
          <IonCol size="12" sizeSm="6">
            {(/admin/i.test(authUser?.role?.name || "") ||
              booking.aidServiceProfile?.profile?.userId === authUser?.userId
              ) && (
              <div>
                <IonButton
                  aria-haspopup={true}
                  aria-expanded={openManageProccessedFilesOverlay}
                  aria-controls="manage-processed-files"
                  onClick={() =>
                    setOpenManageProcessedFilesOverlay(
                      !openManageProccessedFilesOverlay
                    )
                  }
                >
                  Add Processed Documents
                </IonButton>
              </div>
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol sizeXl="12">
            <h4>Documents to be Processed</h4>
          </IonCol>
          {booking.rawMediaFiles?.map((mediaFile, index) => (
            <IonCol size="6" sizeSm="4" key={index}>
              <div style={{ display: "flex" }}>
                <div style={{ width: "90%" }}>
                  <ViewFile fileObj={mediaFile} />
                  <span>{mediaFile.copies} copies</span>
                </div>
              </div>
            </IonCol>
          ))}
        </IonRow>

        <IonRow>
          <IonCol size="12">
            <h3>Matched Provider</h3>
            {booking.aidServiceProfile?.id ? (
              <AidServiceProfileCard
                aidServiceProfile={booking.aidServiceProfile || {}}
              />
            ) : (
              <p>No Service Provider Matched Yet</p>
            )}
          </IonCol>
          <IonCol size="12"></IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <h3>Rating and Review</h3>
          </IonCol>

          <IonCol size="3">
            <div className="ion-text-center">
              <span style={{ fontSize: "3em" }}>{booking.rating}</span>
              <br />
              {ratingRange.map((item) => (
                <IonIcon key={item} icon={starSharp}></IonIcon>
              ))}
            </div>
          </IonCol>
          <IonCol size="9">
            <p>{booking.review}</p>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol sizeXl="12">
            <h4>Documents Processed</h4>
          </IonCol>
          {booking.processedMediaFiles?.map((mediaFile, index) => (
            <IonCol size="6" sizeSm="4" key={index}>
              <div style={{ display: "flex" }}>
                <div style={{ width: "90%" }}>
                  <ViewFile fileObj={mediaFile} />
                  <span>{mediaFile.copies} copies</span>
                </div>
              </div>
            </IonCol>
          ))}
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <BookingCostCard booking={booking} />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonModal
        id="manage-processed-files"
        isOpen={openManageProccessedFilesOverlay}
        onDidDismiss={() => setOpenManageProcessedFilesOverlay(false)}
      >
        <IonContent className="ion-margin ion-padding">
          <IonItem>
            <IonIcon
              role="button"
              aria-label="close"
              onClick={() => setOpenManageProcessedFilesOverlay(false)}
              slot="end"
              icon={closeCircle}
            />
          </IonItem>
          <ManageBookingProcessedFiles
            booking={booking}
            onCompletion={() => {
              setOpenManageProcessedFilesOverlay(false);
              router.push(`${BookingRoutes.INVOICE}?bi=${booking.id}`);
            }}
          />
        </IonContent>
      </IonModal>
    </>
  );
};

export const BookingCostCard = ({ booking, localRawFiles }: { booking: IBooking; localRawFiles?: (IFileAndObjectUrl & {copies: number})[] }) => {
  const taxRate = 7.5;
  const serviceRate = Number(booking.aidService?.serviceRate);
  const noOfCopiesBase =
    booking.rawMediaFiles?.reduce((acc, mediaFile) => {
      return acc + Number(mediaFile.copies);
    }, 0) || 0;

  const noOfCopiesLocal = localRawFiles?.reduce((acc, mediaFile) => {
      return acc + Number(mediaFile.copies);
    }, 0) || 0;
    
   const noOfCopies = localRawFiles ? noOfCopiesLocal : noOfCopiesBase;

  const serviceCost = serviceRate * noOfCopies;

  const taxCost = (taxRate / 100) * serviceCost;

  let transportationCost = /Anambra/i.test(
    booking.locationAddress?.state || ""
  )
    ? 5000
    : 10000;
  
  transportationCost = booking.deliveryType === DeliveryType.PICK_UP ? 0: transportationCost;
  
  const subTotal = serviceCost + transportationCost;
  const totalAmount = serviceCost + taxCost + transportationCost;

  return (
    <IonList>
      <IonItem>
        <span>Service Rate</span>
        <span slot="end">{formatCurrency(serviceRate, "NGN")}</span>
      </IonItem>
      <IonItem>
        <span>
          Service Cost ({formatCurrency(serviceRate)} * {noOfCopies} copies)
        </span>
        <span slot="end"> {formatCurrency(serviceRate, "NGN")}</span>
      </IonItem>
      <IonItem>
        <span>Transport Rate</span>
        <span slot="end">{formatCurrency(transportationCost, "NGN")}</span>
      </IonItem>

      <IonItem>
        <span>Sub Total</span>
        <span slot="end">{formatCurrency(subTotal, "NGN")}</span>
      </IonItem>

      <IonItem>
        <span>Total</span>
        <IonLabel slot="end">
          <p>
            {taxRate}% VAT = {formatCurrency(taxCost, "NGN")}
          </p>
          {formatCurrency(Number(booking.totalAmount || totalAmount), "NGN")}
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export const ManageBookingProcessedFiles = ({
  booking,
  onCompletion,
}: {
  booking: IBooking;
  onCompletion: () => void;
}) => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();
  const [selectedProcessedFiles, setSelectedProcesedFiles] = useState<
    (IFileAndObjectUrl & { copies: number })[]
  >([]);

  const saveBookingProcessedFiles = async () => {
    try {
      if (selectedProcessedFiles.length === 0)
        throw new Error("No processed file uploaded");
      setLoading({ isLoading: true, loadingMessage: "processing" });
      const resPromise = await Promise.all(
        selectedProcessedFiles.map((processedFile) =>
          uploadFiles([processedFile])
        )
      );
      const processedMediaFiles: IBookingMediaFile[] = resPromise.map(
        (res, index) => ({
          attachmentType: (res || [])[0].attachmentType,
          attachmentUrl: (res || [])[0].attachmentUrl,
          copies: selectedProcessedFiles[index].copies,
        })
      );
      await postData<IBooking>(
        `${APIBaseURL}/booking/${booking.id}/processed`,
        {
          method: "put",
          processedMediaFiles,
        }
      );
      setLoading({ isLoading: false, loadingMessage: "" });
      onCompletion();
    } catch (error) {
      handleAsyncError(error, "Error saving processed files");
    }
  };

  return (
    <IonGrid>
      <BookingMediaFilesManager
        onCompletion={(fileObjs) => {
          setSelectedProcesedFiles(fileObjs);
        }}
        label="Add Processed Files"
      />
      <IonRow>
        <IonCol size="12">
          <IonButton onClick={saveBookingProcessedFiles} expand="full">
            Upload Documents
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
