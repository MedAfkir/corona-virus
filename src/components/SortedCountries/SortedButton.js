import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortNumericDownAlt,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faSortNumericDown,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import styles from "./SortedButton.module.scss";

const SortedButton = ({ sortedBy, order, type, handleClick }) => {
  // Handle Icon
  const Icon = () => {
    if (type === "cases") {
      return order === "desc" ? (
        <FontAwesomeIcon icon={faSortNumericDownAlt} />
      ) : (
        <FontAwesomeIcon icon={faSortNumericDown} />
      );
    } else if (type === "names") {
      return order === "desc" ? (
        <FontAwesomeIcon icon={faSortAlphaDown} />
      ) : (
        <FontAwesomeIcon icon={faSortAlphaDownAlt} />
      );
    }
  };

  // Handle order (asc || desc)
  const handleOrder = (order) => {
    const orders = ["asc", "desc"];
    return orders[Number(!orders.indexOf(order))];
  };

  // Handle click
  const onClick = () => {
    const options =
      sortedBy === type
        ? { sortedBy, order: handleOrder(order) }
        : { sortedBy: type, order };
    handleClick(options);
  };

  return (
    <button
      onClick={() => onClick()}
      className={cx(styles.filter, { [styles.active]: type === sortedBy })}
    >
      <Icon />
    </button>
  );
};

export default SortedButton;
