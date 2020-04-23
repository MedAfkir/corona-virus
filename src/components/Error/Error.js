import React from "react";
import { AlertTriangle } from "react-feather";
import { colors } from "./../../utils";

const Error = ({ msg }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: colors.red,
        fontWeight: 700,
        fontSize: 22,
      }}
    >
      <AlertTriangle size={45} />
      <p style={{ marginTop: 10 }}>{msg ? msg : "Error"} </p>
    </div>
  );
};

export default Error;
