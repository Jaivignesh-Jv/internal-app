import React from "react";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

const navbar = () => {
  return (
    <>
      <div
        style={{
          width: "3.6%",
          height: "100%",
          backgroundColor: "#FCFCFC",
          position: "fixed",
          borderRight: "1px solid #E7E7E7",
          borderBottom: "1px solid rgba(66, 133, 244, 0.2)",
        }}
      >
        <div
          style={{
            marginTop: 60,
            textAlign: "center",
          }}
        >
          <WhatshotOutlinedIcon
            style={{
              color: "#6D6D6D",
              padding: 5,
              borderRadius: 5,
              backgroundColor: "#D7E5FF",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default navbar;
