import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { helpCircle, informationCircle } from "ionicons/icons";
import { useState } from "react";
import { help } from "yargs";

export interface IFAQCardProps {
  question: string;
  answerS: string[];
}

const faqs: IFAQCardProps[] = [
  {
    question: "How do i book a service",
    answerS: [
      "Click on the service, to enter the booking page",
      "Select your preferred delivery option",
      "IMPORTANT, submit the raw material you want us to process, either by using the camera component or use the picker to upload from device or atleast use the voice note component to describe your service eg in case of a complex graphic design work",
      "Please use the voice note component, in cases you can not use camera or to describe complex designs",
      "after your selection, in the popover that shows, set the number of copies for the work",
      "select location address if you chose a door-step delivery",
      "set delivery date and time",
      "set additional information for your booking using the text box or voice note component",
      "click review to review your booking with the costings",
      "Create your booking!",
      "Voila, on successful booking, you will get to the invoice page and use the Pay Now button to pay and get your service matched and processed",
    ],
  },
  {
    question: "How do i track my booking",
    answerS: ["Log in and use the My Bookings icon in the navigation bar"],
  },
  {
    question: "can i use this on a website",
    answerS: [
      "Yes, all featurs are live on our web as well as on the mobile apps",
    ],
  },
  {
    question:
      "can i visually impaired person use this app and any other web apps",
    answerS: [
      "Yes this app is built with accessibility considerations, it also spots a voice note component in case you are unable to use other user input options",
      "And yes, with proper web accessibility standard WCAG, visually impaired persons can use any software application",
    ],
  },
];

export const FAQCard = ({ question, answerS }: IFAQCardProps) => {
  const [openAnswers, setOpenAnswers] = useState(false);

  return (
    <div>
      <h2
        aria-controls={question}
        role="button"
        aria-label="show answer"
        onClick={() => setOpenAnswers(!openAnswers)}
      >
        {question}{" "}
      </h2>
      <div id={question}>
        {openAnswers &&
          answerS?.map((answer, index) => (
            <div style={{ display: "flex" }} key={index}>
              <div>
                <IonIcon icon={informationCircle} />
              </div>
              <div className="ion-margin-horizontal">
                <p>{answer}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export const FAQs = () => {
  return (
    <section id="faq" className="home-sections">
      <div className="ion-text-danger ion-text-uppercase ion-text-bold">
        <h3>
          <IonIcon icon={helpCircle} /> FAQs
        </h3>
        <h6>Frequently Asked Questions</h6>
      </div>
      <div className="ion-margin">
        <IonGrid>
          <IonRow>
            {faqs.map((item, index) => (
              <IonCol key={index} size="12" sizeSm="5">
                <FAQCard question={item.question} answerS={item.answerS} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};
