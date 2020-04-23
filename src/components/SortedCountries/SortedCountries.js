import React, { useState } from "react";
import SortedButton from "./SortedButton";
import styles from "./SortedCountries.module.scss";

const SortedCountries = ({
  handleSortedOptions,
  sorted: { order, sortedBy },
}) => {
  const [numericOrder, setNumericOrder] = useState(
    sortedBy === "cases" ? order : "desc"
  );
  const [alphaOrder, setAlphaOrder] = useState(
    sortedBy === "names" ? order : "asc"
  );

  const handleClick = (options) => {
    if (options.sortedBy === "names") setAlphaOrder(options.order);
    if (options.sortedBy === "cases") setNumericOrder(options.order);
    handleSortedOptions(options);
  };

  return (
    <div className={styles.filters}>
      <SortedButton
        type="cases"
        sortedBy={sortedBy}
        order={numericOrder}
        handleClick={handleClick}
      />
      <SortedButton
        type="names"
        order={alphaOrder}
        sortedBy={sortedBy}
        handleClick={handleClick}
      />
    </div>
  );
};

export default SortedCountries;
