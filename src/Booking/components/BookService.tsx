import { useEffect, useRef, useState } from "react";
import { IAidService } from "../../aid-service/interfaces/aid-service.interface";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { IAidServiceProfile } from "../../aid-service/interfaces/aid-service-profile";
import {
  arrowBack,
  arrowForward,
  closeCircle,
  compassSharp,
  folderOpenSharp,
  personSharp,
  walkSharp,
} from "ionicons/icons";
import { AidServiceSelector } from "./AidServiceSelector";
import { BookingDTO } from "../dtos/booking.dto";
import { LocationAddressCard, LocationAddressManager } from "./LocationAddress";
import { ILocationAddress } from "../../aid-service/dtos/aid-service-profile.dto";
import { DateSelector } from "../../shared/components/form/DateSelector";
import { AidServiceProfileSelector } from "./AidServiceProfileSelector";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { APIBaseURL, postData } from "../../shared/api/base";
import { BookingCostCard } from "./BookingDetail";
import { IBooking } from "../interfaces/booking";
import { BookingRoutes } from "../enums/routes";
import { IFileAndObjectUrl } from "../../file/components/MultipleFiles";
import { TextAreaInput } from "../../shared/components/form/TextAreaInput";
import { VoiceInput } from "../../file/components/VoiceInput";
import { FileInput } from "../../file/components/FileInput";
import { uploadFiles } from "../../file/utils/filehooks";
import { BookingMediaFilesManager } from "./BookingMediaFilesManager";
import { DeliveryType } from "../enums/booking";

export interface IBookServieProps {
  aidService: IAidService;
  booking?: IBooking;
}

export const BookService = ({ aidService, booking }: IBookServieProps) => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();
  const router = useIonRouter();
  
  const [bookingDto, setBookingDto] = useState<BookingDTO>({deliveryType: DeliveryType.DOOR_STEP} as BookingDTO);
  const [locationAddress, setLocationAddress] = useState<ILocationAddress>(
    bookingDto.locationAddress || {}
  );
  const [openReviewOverlay, setOpenReviewOverlay] = useState(false);
  const [selectedRawMediaFiles, setSelectedRawMediaFiles] = useState<
    (IFileAndObjectUrl & { copies: number })[]
  >([]);
  const [selectedDescriptionMediaFile, setSelectedDescriptionMediaFile] =
    useState<IFileAndObjectUrl | null>(null);
  const [openEditRawFileCopiesTab, setOpenEditRawFileCopiesTab] =
    useState(false);

  const [currentRawFile, setCurrentRawFile] = useState<
    (IFileAndObjectUrl & { copies: number }) | null
  >(null);
  const selectedAidServiceRef = useRef<IAidService>(aidService);

  const createBooking = async () => {
    try {
      if (
        !bookingDto.rawMediaFiles?.length &&
        selectedRawMediaFiles.length === 0
      )
        throw new Error("Please specify what material you want us to process");

      if (!selectedAidServiceRef.current.id)
        throw new Error("No valid aid service selected");

      bookingDto.aidServiceId = selectedAidServiceRef.current.id;
      if (!bookingDto.startDate)
        throw new Error("Service date and time is required");
      if(!(Object.values(DeliveryType).includes(bookingDto.deliveryType))) throw new Error("Please select a valid delivery type");

      if (
        bookingDto.deliveryType === DeliveryType.DOOR_STEP &&
        ((!locationAddress?.street?.trim()?.length ||
          !locationAddress?.city?.trim()?.length))
      )
        throw new Error(
          "Based On Your Delivery type: Street and city are required"
        );

      bookingDto.locationAddress = locationAddress;

      setLoading({ isLoading: true, loadingMessage: "creating booking" });

      if (selectedRawMediaFiles.length > 0) {
        const resPromises = await Promise.all(
          selectedRawMediaFiles.map((rawFile) => uploadFiles([rawFile]))
        );
        bookingDto.rawMediaFiles = resPromises.map((res, index) => ({
          attachmentType: (res || [])[0].attachmentType,
          attachmentUrl: (res || [])[0].attachmentUrl,
          copies: selectedRawMediaFiles[index].copies,
        }));
      }
      if (selectedDescriptionMediaFile) {
        const res = await uploadFiles([selectedDescriptionMediaFile]);

        if (res) bookingDto.descriptionMedia = res[0];
      }
      const res = booking?.id
        ? await postData<IBooking>(`${APIBaseURL}/booking/${booking.id}`, {
            method: "put",
            ...bookingDto,
          })
        : await postData<IBooking>(`${APIBaseURL}/booking`, {
            method: "post",
            ...bookingDto,
          });
      setLoading({ isLoading: false, loadingMessage: "" });
      router.push(`${BookingRoutes.INVOICE}?bi=${res.id}`);
    } catch (error) {
      handleAsyncError(error, "Error creating booking");
    }
  };

  useEffect(() => {
    selectedAidServiceRef.current = {
      ...aidService,
      ...(selectedAidServiceRef.current || {}),
    } as IAidService;
    if (booking?.id) {
      bookingDto.locationAddress = booking.locationAddress;
      bookingDto.startDate = booking.startDate;
    }
  }, [aidService, booking]);

  return (
    <div>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeSm="8">
            <IonItem>
              <IonSelect
                label="Please select how you want your item delivered"
                labelPlacement="stacked"
                value={bookingDto.deliveryType}
                onIonChange={(evt) => {
                  setBookingDto({
                    ...bookingDto,
                    deliveryType: evt.detail.value as DeliveryType,
                  });
                }}
              >
                <IonSelectOption value={DeliveryType.DOOR_STEP}>
                  {DeliveryType.DOOR_STEP} (Your location address is required)
                </IonSelectOption>
                <IonSelectOption value={DeliveryType.PICK_UP}>
                  {DeliveryType.PICK_UP} (You will easily pick it up from our
                  office)
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        <BookingMediaFilesManager
          onCompletion={(fileObjs) => {
            setSelectedRawMediaFiles(fileObjs);
          }}
          label="Pick the documents you want us to process by snaping it, uploading from your device or you can make a voice note describing your work, then set number for copies and then, clikk Add File"
        />
        <IonRow>
          <IonCol size="12">
            <div>
              <div>
                <AidServiceSelector
                  aidService={selectedAidServiceRef.current}
                  onSelection={(aService: IAidService) => {
                    selectedAidServiceRef.current = aService;
                    setBookingDto({
                      ...bookingDto,
                      aidServiceId: aService.id,
                    });
                  }}
                />
              </div>

              <div>
                {bookingDto.deliveryType === DeliveryType.DOOR_STEP && (
                  <LocationAddressManager
                    locationAddress={locationAddress}
                    setLocationAddress={setLocationAddress}
                  />
                )}
              </div>
              <div>
                <DateSelector
                  label="Select the date and time for the service"
                  initDate={new Date(bookingDto.startDate || Date.now())}
                  onSelection={(seletedDate: Date) => {
                    setBookingDto({
                      ...bookingDto,
                      startDate: seletedDate.toISOString(),
                    });
                  }}
                />
              </div>
              <div>
                <h3>Any Additional Information? </h3>
                <p>
                  You the below input methods: text typing, voice note or file
                  upload to add any additional information about your booking
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div style={{ width: "90%" }}>
                  <TextAreaInput
                    onCompletion={(str) => {
                      setBookingDto({ ...bookingDto, bookingNote: str });
                    }}
                  />
                </div>
                <div>
                  <VoiceInput
                    onCompletion={(fileObj) => {
                      setSelectedDescriptionMediaFile(fileObj);
                    }}
                  />
                </div>
                <div>
                  <FileInput
                    onCompletion={(fileObj) => {
                      setSelectedDescriptionMediaFile(fileObj);
                    }}
                  />
                </div>
                <div className="ion-margin">
                  <IonItem>
                    <IonInput
                      type="tel"
                      label="Give us a contact phonenumber"
                      labelPlacement="stacked"
                      value={bookingDto.contactPhoneNumber}
                      onIonInput={(evt) => {
                        setBookingDto({
                          ...bookingDto,
                          contactPhoneNumber: evt.detail.value as string,
                        });
                      }}
                    />
                  </IonItem>
                </div>
              </div>
              <IonButton
                aria-haspopup={true}
                aria-expanded={openReviewOverlay}
                expand="full"
                onClick={() => setOpenReviewOverlay(!openReviewOverlay)}
              >
                Review Booking
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonModal
        isOpen={openReviewOverlay}
        onDidDismiss={() => setOpenReviewOverlay(false)}
      >
        <IonContent>
          <IonItem>
            <IonButton
              fill="clear"
              aria-label="close"
              slot="end"
              onClick={() => setOpenReviewOverlay(false)}
            >
              <IonIcon icon={closeCircle}></IonIcon>
            </IonButton>
          </IonItem>
          <h2>Review And Create Booking Request</h2>
          <div>
            <h3>Review Booking</h3>
            <div>
              <AidServiceSelector
                aidService={selectedAidServiceRef.current}
                onSelection={(aService: IAidService) => {
                  selectedAidServiceRef.current = aService;
                  setBookingDto({
                    ...bookingDto,
                    aidServiceId: aService.id,
                  });
                }}
              />
            </div>
            <p>
              {" "}
              Service Date and Time:{" "}
              <span style={{ fontWeight: "bold" }}>
                {bookingDto.startDate?.split("T")[0]} |{" "}
                {bookingDto.startDate?.split("T")[1]?.split(".")[0]}{" "}
              </span>{" "}
            </p>
            <div>
              {bookingDto.deliveryType === DeliveryType.DOOR_STEP && (
                <LocationAddressCard locationAddress={locationAddress} />
              )}
            </div>

            <div>
              <BookingCostCard
                booking={
                  {
                    ...bookingDto,
                    aidService: selectedAidServiceRef.current,
                  } as unknown as IBooking
                }
                localRawFiles={selectedRawMediaFiles}
                  />
            </div>
            <p>
              <IonButton expand="full" onClick={createBooking}>
                Create Booking
              </IonButton>
            </p>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
