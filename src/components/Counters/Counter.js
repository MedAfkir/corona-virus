import React from "react";
import { PlusCircle, CheckCircle, AlertCircle } from "react-feather";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Counter.module.scss";

const Counter = ({ type, count }) => {
  let label = "";
  let Icon;
  switch (type) {
    case "deaths":
      label = "Deaths";
      Icon = AlertCircle;
      break;
    case "confirmed":
      label = "Confirmed";
      Icon = PlusCircle;
      break;
    case "recovered":
      label = "Recovered";
      Icon = CheckCircle;
      break;
    default:
      label = "";
      Icon = "";
  }

  return (
    <div className={cx(styles.card, styles[type])}>
      <div className={cx(styles.icon, styles[type])}>
        <Icon size={70} />
      </div>
      <div className={styles.count}>
        <CountUp separator=" " end={count} />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default Counter;
