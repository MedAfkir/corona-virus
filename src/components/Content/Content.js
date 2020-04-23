import React, { useContext } from "react";

import SpinnerLoader from "./../Loader";
import Error from "./../Error";
import GoToWorldContent from "./../GoToWorldContent";
import Title from "../Title";
import Counters from "../Counters";
import Chart from "./../Chart";
import Notification from "./../Notification";

import { Context } from "./../../Context";

import cx from "classnames";
import styles from "./Content.module.scss";

const Content = ({ showSideBar }) => {
  const {
    error,
    loadingContent,
    selectCountry,
    data: { lastUpdate },
  } = useContext(Context);

  // classnames of Content
  const classnames = cx(styles.content, { [styles.fullpage]: !showSideBar });

  // Loading Data
  if (loadingContent) {
    const country = selectCountry ? selectCountry : "World";
    return (
      <div className={classnames}>
        <SpinnerLoader text={`Loading ${country} data...`} />
      </div>
    );
  }

  // Error
  if (error) return <Error />;

  return (
    <div className={classnames}>
      {selectCountry && <GoToWorldContent />}
      <Title />
      <Counters />
      <Chart />
      <Notification lastUpdate={lastUpdate} />
    </div>
  );
};

export default Content;
