import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { menuSharp, notificationsSharp } from "ionicons/icons";
import SideMenu from "../menus/SideMenu";
import { useState } from "react";

export interface IHeaderProps {
  title: string;
}

export const BaseHeader = ({ title }: IHeaderProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div>
        <SideMenu isOpen={openSideMenu} onClose={() => setOpenSideMenu(false)} />
      
      <span
      className="ion-text-lg"
      role="button"
      aria-label="open menu"
      onClick={() => setOpenSideMenu(true)}
      >
        <IonIcon icon={menuSharp} />
      </span>

      <span className="ion-text-lg ion-margin-horizontal">{title}</span>
    </div>
  );
};
