import React from "react";
import "./SideMenu.css";
import { briefcase, closeCircle, home, person } from "ionicons/icons";
import { UserRoutes } from "../../../user/enums/routes.enum";
import { HomeRoutes } from "../../../home/enums/routes";
import { INavigationButton } from "./BaseMenu";
import { useAuthGuardContextStore } from "../../../auth/contexts/AuthGuardContext";
import { useLocalStorage } from "../../../utils";
import { IAuthUserProfile } from "../../../user/interfaces/user";
import { LocalStorageEnum } from "../../enums";
import { IonIcon, IonItem, useIonRouter } from "@ionic/react";
import { navItems } from "../partials/BaseFooter";

export interface ISideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: ISideMenuProps) {
  const { logOutUser } = useAuthGuardContextStore();
  const router = useIonRouter();
  const { getItem } = useLocalStorage();
  const user = getItem<IAuthUserProfile>(LocalStorageEnum.USER);

  const navigationButtonss: INavigationButton[] = [
    ...navItems,
    {
      id: 2,
      label: "My Profile",
      routeLink: `${UserRoutes.PROFILE}?ui=${user?.userId}`,
      icon: person,
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`menu-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sliding Menu */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          {user && <h2>{user.profile?.firstName}</h2>}
        </div>

        <ul className="menu-items">
          {navigationButtonss.map((navButton, index) => (
            <li
              key={index}
              onClick={() => {
                onClose();
                router.push(navButton.routeLink);
              }}
            >
              <IonIcon
                icon={navButton.icon}
                className="ion-margin-horizontal"
              ></IonIcon>{" "}
              {navButton.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
