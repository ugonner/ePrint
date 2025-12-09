import { IonIcon, isPlatform, useIonRouter } from "@ionic/react";
import { arrowForward, copyOutline } from "ionicons/icons";
import { IAidService } from "../../aid-service/interfaces/aid-service.interface";
import { AidServiceRoutes } from "../../aid-service/enums/routes";
import { BookingRoutes } from "../../Booking/enums/routes";

export interface IThematicAreaProps {
    focalAreas: IAidService[];
}



export const ThematicAreas = ({focalAreas}: IThematicAreaProps) => {
    const router = useIonRouter();

    return (
        <section id="thematic-areas" className="home-sections">
            <div
            style={{
                backgroundImage: `url(/images/banners/banner-1.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "fixed",
                backgroundRepeat: "no-repeat",
                padding: "30px"
            }}>
                <div
                style={{
                    padding: isPlatform("desktop") ? "40px": "10px",
                    backgroundColor: "black",
                    maxWidth: `${isPlatform("desktop") ? "65%": "100%"}`
                }}>
                    <div className="ion-margin ion-padding ion-text-center">
                        <h2>Book Your Service</h2>
                        <p>These are areas we provide great expertise and push more strength for innovative developments</p>
                    </div>
                    <div
                    style={{
                        borderLeft: "5px solid white",
                        paddingTop: 0
                    }}>
                        {
                            focalAreas.map((focalArea, index) => (
                                <div 
                                key={index}
                                style={{
                                    marginTop: 0,
                                    paddingTop: 0,
                                    marginBottom: "40px",
                                    display: "flex"
                                }}
                                className="ion-margin-horizontal"
                                >
                                    <div className="ion-text-center"><br/>
                                        <IonIcon icon={copyOutline} size="large" />
                                        <span style={{
                                            width: "5px",
                                            height: "48px",
                                            backgroundColor: "white"
                                        }}>|</span>

                                    </div>
                                    <div 
                                    className="ion-margin-horizontal"
                                    role="button"
                                    aria-label="view service unit's activities and updates"
                                    onClick={() => router.push(`${BookingRoutes.BOOK_SERVICE}?asi=${focalArea.id}`)}
                                    >
                                        <h3>{focalArea.name}</h3>
                                        <p>{focalArea.description?.substring(0, 120)}</p>
                                        <IonIcon icon={arrowForward} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}