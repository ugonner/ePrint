import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  IonAvatar,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  isPlatform,
} from "@ionic/react";
import { informationSharp } from "ionicons/icons";

export default function Partners() {
  const slides = [
    {
      name: "Inclusive Global Aid",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/NGO_Logo.png",
      testimonial:
        "Collaborating with iDigiHub has helped us reach disability communities with dignity and cultural awareness.",
    },
    {
      name: "Diaspora Impact Network",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Global_Union_logo.svg/640px-Global_Union_logo.svg.png",
      testimonial:
        "Together we have implemented life-changing support programs for persons with disabilities across Africa.",
    },
    {
      name: "People First Foundation",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Hands_of_hope_foundation_logo.svg/640px-Hands_of_hope_foundation_logo.svg.png",
      testimonial:
        "iDigiHub bridges the gap between resources and the real needs of disabled communities.",
    },
    {
      name: "Health Access Africa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/World_Health_Organization_Logo.svg/640px-World_Health_Organization_Logo.svg.png",
      testimonial:
        "Our partnership has improved access to inclusive healthcare outreach for people with disabilities.",
    },
    {
      name: "Tech4Inclusion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Tech_logo.svg/640px-Tech_logo.svg.png",
      testimonial:
        "We work with iDigiHub to develop digital assistive tools affordable for African communities.",
    },
    {
      name: "Community Thrive Initiative",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Community_Icon.svg/640px-Community_Icon.svg.png",
      testimonial:
        "iDigiHub ensures diaspora-led interventions reach grassroots communities effectively.",
    },
    {
      name: "Africa Education Link",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Education_logo.svg/640px-Education_logo.svg.png",
      testimonial:
        "We partner with iDigiHub to promote inclusive education initiatives for disabled learners.",
    },
    {
      name: "Empower Sports Africa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Sports_logo.svg/640px-Sports_logo.svg.png",
      testimonial:
        "Our collaboration has expanded adaptive sports initiatives for disabled youth in marginalized communities.",
    },
  ];

  return (
    <section id="partners" className="home-sections">
      <div className="ion-margin">
        <div className="ion-text-danger ion-text-uppercase ion-text-bold">
          Partnerships and Testimonials
        </div>

        <Swiper
        modules={[Autoplay]}
          autoplay={true}
          loop={true}
          slidesPerView={isPlatform("desktop") ? 4 : 1}
        >
          {slides.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="slide-container">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div>
                    <IonIcon icon={informationSharp} size="large" />
                  </div>
                  <div className="ion-margin">{item.testimonial}</div>
                </div>
                <IonItem>
                  <IonAvatar>
                    <IonImg src={item.logo} alt={item.name} />
                  </IonAvatar>
                  <IonLabel className="ion-margin-horizontal">
                    <h4>{item.name}</h4>
                  </IonLabel>
                  '
                </IonItem>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
