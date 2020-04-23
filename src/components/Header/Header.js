import React from "react";
import { Menu } from "react-feather";
import styles from "./Header.module.scss";

const Header = ({ handleSideBar }) => {
  return (
    <header className={styles.header}>
      <button onClick={handleSideBar}>
        <Menu />
      </button>
      <a href="/">Corona virus</a>
    </header>
  );
};

export default Header;
