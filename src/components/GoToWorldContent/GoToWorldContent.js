import React, { useContext } from "react";
import { Context } from "../../Context";
import { ArrowLeft } from "react-feather";
import styles from "./GoToWorldContent.module.scss";

const GoToWorldContent = (props) => {
  const { handleSelectCountry } = useContext(Context);
  return (
    <button className={styles.btn} onClick={() => handleSelectCountry()}>
      <ArrowLeft size={20} />
      <span>Go Back</span>
    </button>
  );
};

export default GoToWorldContent;
