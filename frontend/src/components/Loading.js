import React from "react";
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        textAlign:"center",
        backgroundColor: "#0008",
        color:"white",
        top:"0",
        left:"0",
      }}
    >
      
        <text className="loading-text" fill="#fff" x="4" y="147">
          LOADING...
        </text>
    </div>
  );
};

export default Loading;
