import { useLocation } from "react-router"
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";
import { useEffect, useState } from "react";
import { IAidService } from "../../aid-service/interfaces/aid-service.interface";
import { APIBaseURL, getData } from "../../shared/api/base";
import { IonContent, useIonAlert, useIonRouter } from "@ionic/react";
import { BookService } from "../components/BookService";
import { IBooking } from "../interfaces/booking";
import { NavigationBarGap } from "../../shared/components/partials/NavigationBarGap";
import { HomeRoutes } from "../../home/enums/routes";

export const BookAidServicePage = () => {
    const {setLoading, handleAsyncError} = useAsyncHelpersContext();
    const [presentAlert] = useIonAlert();
    const router = useIonRouter();
    
    const queryParams = new URLSearchParams(useLocation().search);
    const aidServiceId = queryParams.get("asi");
    const bookingId = queryParams.get("bi");
    
    const [aidService, setAidService] = useState<IAidService>({} as IAidService);
    const [booking, setBooking] = useState<IBooking>();

    const getAidService = async () => {
        try{
            
            setLoading({isLoading: true, loadingMessage: "Fetching service"});
            const res = await getData<IAidService>(`${APIBaseURL}/aid-service/${aidServiceId}`);
            setAidService({...res});
            setLoading({isLoading: false, loadingMessage: ""});
            
        }catch(error){
            handleAsyncError(error, "Error getting aid sservice");
            presentAlert({
                header: "Connection Issue",
                message: "Failed to retrieve servie detail probably a network connection issue",
                buttons: [
                    {
                        text: "Okay",
                        role: "cancel",
                        handler: () => router.push(HomeRoutes.HOME)
                    }
                ]
            })
        }
    }

    const getBooking = async () => {
        try{
            setLoading({isLoading: true, loadingMessage: "Fetching booking detail"});
            const res = await getData<IBooking>(`${APIBaseURL}/booking/${bookingId}`);
            setBooking(res);
            setLoading({isLoading: false, loadingMessage: ""})
        }catch(error){
            handleAsyncError(error, "Error getting aid sservice provider");
        }
    }

    useEffect(() => {
        getAidService();
        if(bookingId) getBooking();
    }, [])
    return (
        <>
        <IonContent>
            <h3>Book Service</h3>
            <BookService aidService={aidService} booking={booking} />
            <NavigationBarGap />
        </IonContent>
                    
        
        </>
    )
}