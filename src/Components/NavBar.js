import React from "react";
import Notifications from "./Notifications";
import exrxlogo from "../Images/ezrxlogo-small.png";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="logo">
        <img src={exrxlogo}></img>
      </div>
      <div className="filler"></div>
      <div className="notification-bell">
        <Notifications></Notifications>
      </div>
    </div>
  );
};

export default NavBar;
