import React from "react";

const Toast = ({ title, body, bgColor, textColor }) => {
  return (
    <div
      className="toast"
      style={{
        position: "fixed",
        padding: "1rem",
        borderRadius: "5px",
        backgroundColor: `${bgColor}`,
        top: "5px",
        right: "5px",
        zIndex: "50",
        minWidth: "230px",
      }}
    >
      <div
        className="toast-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h5 style={{ fontWeight: "600" }}>{title}</h5>
      </div>
      <div className="toast-body" style={{ padding: "0 0rem" }}>
        <p style={{color: `${textColor}`}}>{body}</p>
      </div>
    </div>
  );
};

export default Toast;
