import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";

export default function Tab2() {
  const page = useRef(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Knowledge</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonImg
            src="/50-30-20.jpg"
            alt="Pie chart showing The 50-30-20 rule"
          ></IonImg>
          <IonCardHeader>
            <IonCardTitle>The 50-30-20 Rule</IonCardTitle>
            <IonCardSubtitle>Budgeting</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            The 50-30-20 rule is a budgeting guideline that allocates 50% of
            after-tax income to needs, 30% to wants, and 20% to savings.
          </IonCardContent>

          <IonButton id="open-modal" fill="clear">
            Know More
          </IonButton>
        </IonCard>

        <IonCard>
          <IonImg
            src="/the-bi.jpg"
            alt="An image showing full form of The THE-BI rule as 'Term Insurance, Health Insurance, Emergency Fund - Before Investing'"
          ></IonImg>
          <IonCardHeader>
            <IonCardTitle>The THE-BI Rule</IonCardTitle>
            <IonCardSubtitle>Investing</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Before investing, prioritize establishing term insurance, health
            insurance, and an emergency fund.
          </IonCardContent>
        </IonCard>
      </IonContent>

      <IonModal
        ref={modal}
        trigger="open-modal"
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>The 50-30-20 Rule</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Done
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonImg
            src="/50-30-20.jpg"
            alt="Pie chart showing The 50-30-20 rule"
          ></IonImg>
          <div style={{ lineHeight: 1.5 }}>
            <p>
              The 50-30-20 rule is a simple budgeting guideline that helps
              individuals allocate their after-tax income into three distinct
              categories: needs, wants, and savings.
            </p>

            <p>
              This method promotes financial discipline while ensuring that
              essential expenses are covered and future financial goals are
              prioritized.
            </p>

            <p>
              <strong>Breakdown of the 50-30-20 rule</strong>
            </p>

            <ul>
              <li>
                50% for Needs: This portion of your income should cover
                essential expenses that are necessary for survival. These
                include:
                <ul>
                  <li>Housing (rent or mortgage)</li>
                  <li>Utilities (electricity, water, gas)</li>
                  <li>Groceries</li>
                  <li>Transportation (fuel, public transit)</li>
                  <li>Insurance premiums</li>
                  <li>Minimum debt payments (credit cards, loans)</li>
                </ul>
              </li>

              <br />

              <li>
                30% for Wants: This category encompasses discretionary spending,
                which enhances your lifestyle but is not essential. Examples
                include:
                <ul>
                  <li>Dining out or food deliveries</li>
                  <li>Entertainment (movies, concerts)</li>
                  <li>Hobbies and leisure activities</li>
                  <li>Non-essential shopping (clothes, gadgets)</li>
                </ul>
              </li>

              <br />

              <li>
                20% for Savings: The final segment is dedicated to savings and
                investments. This can include:
                <ul>
                  <li>Emergency funds</li>
                  <li>Retirement accounts</li>
                  <li>Investments in stocks or mutual funds</li>
                  <li>
                    Savings for large future purchases (like a home or
                    education)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}
