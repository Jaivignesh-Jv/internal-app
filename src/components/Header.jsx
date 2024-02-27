import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BrightnessLowOutlinedIcon from "@mui/icons-material/BrightnessLowOutlined";

import { ReactComponent as LogoIcon } from "../assets/logo.svg";

const Header = () => {
  return (
    <>
      <div
        style={{
          height: "5.8%",
          position: "fixed",
          backgroundColor: "#F5F5F5",
          color: "black",
          width: "100%",
          fontFamily: "open-sans",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontFamily: "open-sans",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <LogoIcon
            style={{
              marginLeft: "15px",
              paddingRight: "12px",
            }}
          />
          <p
            style={{
              color: "#FCAB00",
            }}
          >
            C
          </p>
          <p
            style={{
              color: "#3576ED",
            }}
          >
            STREAM
          </p>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <BrightnessLowOutlinedIcon
            style={{
              padding: "5px",
              color: "#1A3652",
              width: "20px",
              width: "20px",
            }}
          />
          <NotificationsNoneIcon
            style={{ padding: "5px", color: "#1A3652", width: "20px" }}
          />
          <AccountCircleOutlinedIcon
            style={{ padding: "5px", color: "#1A3652", width: "20px" }}
          />
          <LogoutIcon
            style={{
              padding: "5px",
              color: "#1A3652",
              width: "20px",
              paddingRight: "15px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
