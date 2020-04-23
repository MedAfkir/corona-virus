import React, { useState } from "react";
import { X, AlertOctagon } from "react-feather";
import moment from "moment";
import cx from "classnames";
import styles from "./Notification.module.scss";

const Notification = ({ lastUpdate }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={cx(styles.notification, { [styles.hidden]: hidden })}>
      <div className={styles.alertIcon}>
        <AlertOctagon size={18} />
      </div>
      <p>
        Last Update{" "}
        <time dateTime={lastUpdate}>{moment(lastUpdate).fromNow()}</time>
      </p>
      <div className={styles.deleteIcon}>
        <X size={14} onClick={(e) => setHidden(true)} />
      </div>
    </div>
  );
};

export default Notification;
