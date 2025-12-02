import {
  briefcaseSharp,
  calendarSharp,
  callSharp,
  carSharp,
  informationSharp,
  timeSharp,
} from "ionicons/icons";
import { IBooking } from "../interfaces/booking";
import { formatCamelCaseToSentence } from "../../shared/helpers";
import { formatCurrency } from "../../utils";
import { ServiceDurations } from "./service-durations";
import { icon } from "leaflet";

export interface IBookingFieldItem {
  name: string;
  value: unknown;
  icon?: string;
}

export const getBookingFields = (
  booking: IBooking,
  isFull = false
): IBookingFieldItem[] => {
   const advancedFields = [
    {
      name: "totalAmount",
      value: formatCurrency(Number(booking.totalAmount),"NGN" ),
      icon: briefcaseSharp,
    },
    {
      name: "startDate",
      value: booking.startDate?.split("T")[0],
      icon: calendarSharp,
    },
    {
      name: "startTime",
      value: booking.startDate?.split("T")[1]?.split(".")[0],
      icon: timeSharp,
    },
    {
      name: "endDate",
      value: booking.endDate?.split("T")[0],
      icon: calendarSharp,
    },
    {
      name: "createdAt",
      value: booking.createdAt?.split("T")[0],
    },
    {
      name: "contactPhoneNumber",
      value: booking.contactPhoneNumber,
      icon: callSharp
    },
    {
      name: "deliveryType",
      value: booking.deliveryType,
      icon: carSharp
    },
    {
      name: "bookingNote",
      value: booking.bookingNote,
      icon: informationSharp,
    },
    {
      name: "confirmedByProvider",
      value: booking.confirmedByProvider ? "Yes" : "No",
    },
    {
      name: "confirmedByUser",
      value: booking.confirmedByUser ? "Yes" : "No",
    }
   ]

    const baseFields = [
    {
      name: "compositeBookingId",
      value: booking.compositeBookingId,
    },
    {
      name: "bookingStatus",
      value: booking.bookingStatus,
    },
    {
      name: "paymentStatus",
      value: booking.paymentStatus,
    },
    {
        name: "matched",
        value: booking.isMatched ? "Yes": "No"
    },
    
  ];

  return isFull ? advancedFields : baseFields;
};
