import React from "react";
import { colors } from "./../../utils";
import Loader from "react-loader-spinner";

const SpinnerLoader = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: colors.main,
      }}
    >
      <Loader width={50} height={50} color={colors.main} type="Puff" />
      {!!text && <p style={{ marginTop: 20 }}>{text}</p>}
    </div>
  );
};

export default SpinnerLoader;
