import { IonCol, IonContent, IonGrid, IonRow, isPlatform } from "@ionic/react";
import Banner from "../components/Banner";
import { MidSection } from "../components/MidSection";
import { ThematicAreas } from "../components/ThematicAreas";
import { About } from "../components/About";
import { Stats } from "../components/Stats";
import Partners from "../components/Partners";
import { useIInitContextStore } from "../../shared/contexts/InitContextProvider";
import { BaseFooter } from "../../shared/components/partials/BaseFooter";
import { TrainingTracks } from "../components/TrainingTracks";
import { Donate } from "../components/Donate";
import { useEffect, useState } from "react";
import { IPost } from "../../post/interfaces/post";
import { RecentPosts } from "../components/RecentPosts";
import { Posts } from "../../post/datasets/posts";
import { UserWelcome } from "../components/UserWelcome";
import ServiceQuickActions from "../components/QuickActions";
import { FAQs } from "../components/FAQs";
import { Capacitor } from "@capacitor/core";
import { DownloadApp } from "../components/DownloadAPP";

export const HomePage = () => {
  const { aidServicesRef } = useIInitContextStore();

  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    (async () => {
      setPosts(Posts);
    })();
  }, []);
  return (
    <IonContent>
      {Capacitor.isNativePlatform() ? (
        <>
          <IonGrid>
            <UserWelcome />
            <ServiceQuickActions />
            <FAQs />

            <DownloadApp />
          </IonGrid>
        </>
      ) : (
        <>
          <div
            style={{
              width: "100vw",
              height: isPlatform("desktop") ? "400px" : "700px",
            }}
          >
            <Banner />
          </div>

          <About />
          <DownloadApp />
          <MidSection />
          <ThematicAreas focalAreas={aidServicesRef.current} />
          <RecentPosts posts={posts} />
          <Stats />
          <Partners />
          <TrainingTracks />
          <Donate />
          <FAQs />
          <BaseFooter />
        </>
      )}
    </IonContent>
  );
};
