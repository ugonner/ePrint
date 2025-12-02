import { ILocationAddress } from "../../aid-service/dtos/aid-service-profile.dto";
import { IAttachment } from "../../file/typings/typings";
import { BookingStatus, DeliveryType } from "../enums/booking";
import { IBookingMediaFile } from "../interfaces/booking";
import { VirtualLocationAddressDTO } from "./virtual-location.dto";

export interface BookingDTO {

    
    bookingNote?: string;
    
    locationAddress: ILocationAddress;

    aidServiceId: number;
        
    startDate: string;

    descriptionMedia?: IAttachment;
    
      rawMediaFiles?: IBookingMediaFile[];

      contactPhoneNumber?: string;

      deliveryType: DeliveryType
    
      
    
}

export interface QueryBookingDTO {
    userId: string;

    bookingStatus?: BookingStatus;

    isMatched: string;
}