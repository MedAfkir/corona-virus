import React, { useContext } from "react";

import SpinnerLoader from "./../Loader";
import Error from "./../Error";
import GoToWorldContent from "./../GoToWorldContent";
import Title from "../Title";
import Counters from "../Counters";
import Chart from "./../Chart";

import { Context } from "./../../Context";

import cx from "classnames";
import styles from "./Content.module.scss";

const Content = ({ showSideBar }) => {
  const { error, loadingContent, selectCountry } = useContext(Context);

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
    </div>
  );
};

export default Content;
