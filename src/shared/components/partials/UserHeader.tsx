import {
  IonIcon
} from "@ionic/react";
import { menuSharp, notificationsSharp } from "ionicons/icons";
import { useState } from "react";
import SideMenu from "../menus/SideMenu";

export interface IHeaderProps {
  title: string;
}

export const BaseHeader = ({ title }: IHeaderProps) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className="orgheader"
      style={{
        position: "relative",
        height: "40px",
      }}
    >
      <div 
      className="org-header-band"
      style={{
        position: "absolute",
        top: "20%",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "white",
          border: "4px solid white"
      }}
      >
        <div>
          
          <SideMenu
            isOpen={openSideMenu}
            onClose={() => setOpenSideMenu(false)}
          />
        </div>
         <div>
           <span className="ion-margin-horizontal">
             <IonIcon 
            role="button"
            aria-haspopup={openSideMenu}
            aria-expanded={openSideMenu}
            onClick={() => setOpenSideMenu(!openSideMenu)}
            icon={menuSharp} 
            />
           </span>
          
         </div>
         <div>
          <span style={{marginTop: 0}}>{title}</span>
         </div>
      </div>
      <div
        style={{
          fontFamily: "cursive",
          textAlign: "center",
          backgroundColor: "white",
          color: "black",
          position: "absolute",
          top: "-30px",
          left: "10%",
          width: "80px",
          height: "100px",
          zIndex: 1,
          border: "5px solid white"
          
        }}
      >
        <img
          style={{ width: "100%", maxHeight: "100%" }}
          src="favicon.png"
          alt="logo"
        />
        <span>ADDCR</span>
      </div>
    </div>
  );
};
