import React from "react";

const MobileApp = () => {
  return (
    <div
      className="mobileappmaindiv"
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          color: "#570de6",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        We'll be soon launching <br />
        LocalVibe on Mobile.
      </p>
    </div>
  );
};

export default MobileApp;
