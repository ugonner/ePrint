import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { IPost } from "../../post/interfaces/post";
import { PostCard } from "../../post/components/PostCard";

export interface IRecentPostProps {
    posts: IPost[];
}

export const RecentPosts = ({posts}: IRecentPostProps) => {
    return (
        <section id="recent-posts" className="home-sections">
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <h2 className="ion-text-uppercase ion-text-danger">
                            Recent Posts
                        </h2>
                    </IonCol>
                </IonRow>
                <IonRow>
                    {
                        posts.map((post, index) => (
                            <IonCol key={index} sizeSm="4" size="12">
                                <PostCard post={post} />
                            </IonCol>
                        ))
                    }
                </IonRow>
            </IonGrid>
        </section>
    )
}