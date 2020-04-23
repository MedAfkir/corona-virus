import React, { useContext } from "react";
import { Context } from "./../../Context";
import { formatterNumbers } from "./../../utils";
import cx from "classnames";
import styles from "./CountriesItem.module.scss";

const CountriesItem = ({
  handleSideBar,
  country: { countryRegion, confirmed },
}) => {
  const { handleSelectCountry, selectCountry } = useContext(Context);

  // Handle Click
  const handleClick = (e) => {
    if (window.innerWidth <= 1000) handleSideBar();
    handleSelectCountry(countryRegion);
  };

  return (
    <li
      className={cx(styles.country, {
        [styles.active]: selectCountry === countryRegion,
      })}
      onClick={handleClick}
    >
      <div className={styles.name}>{countryRegion}</div>
      <div className={styles.count}>{formatterNumbers(confirmed)}</div>
    </li>
  );
};

export default CountriesItem;
