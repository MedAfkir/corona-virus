import React, { useContext } from "react";
import { Context } from "./../../Context";
import styles from "./Title.module.scss";

const Title = (props) => {
  const { selectCountry } = useContext(Context);

  return (
    <h1 className={styles.title}>{selectCountry ? selectCountry : "World"}</h1>
  );
};

export default Title;
