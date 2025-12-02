import { ILocationAddress } from "../../aid-service/dtos/aid-service-profile.dto";
import { IAidServiceProfile } from "../../aid-service/interfaces/aid-service-profile";
import { IAidService } from "../../aid-service/interfaces/aid-service.interface";
import { IAttachment } from "../../file/typings/typings";
import { IProfile } from "../../user/interfaces/user";
import { BookingStatus, DeliveryType } from "../enums/booking";

export interface IBookingMediaFile extends IAttachment {
  copies: number;
}

export enum PaymentStatus {
    PAID = "Paid",
    UNPAID = "UnPaid"
}
export interface IBooking {
id: number;

  compositeBookingId: string;

  bookingStatus: BookingStatus;

  bookingStatusNote?: string;

  paymentStatus: PaymentStatus;

  totalAmount: number;

  bookingNote: string;

  locationAddress: ILocationAddress;

  startDate: string;

  endDate: string;

  confirmedByProvider: boolean;

  confirmedByUser: boolean;

  rating: number;

  review: string;

  isMatched: boolean;

  descriptionMedia?: IAttachment;

  rawMediaFiles?: IBookingMediaFile[];

  processedMediaFiles?: IBookingMediaFile[];

  contactPhoneNumber?: string;


  deliveryType: DeliveryType;
    
  aidService: IAidService;

  aidServiceProfile: IAidServiceProfile;

  profile?: IProfile;

 
  createdAt?: string;


  isDeleted?: boolean;
  
}