import React, { useState } from "react";
import { X } from "react-feather";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ value, handleChangeValue }) => {
  const [showBtn, setShowBtn] = useState(false);

  // Handle change
  const handleChange = (e) => {
    handleChangeValue(e.target.value);
    setShowBtn(!!e.target.value);
  };

  // Handle click
  const handleClick = () => {
    handleChangeValue("");
    setShowBtn(false);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.searchbar}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search country..."
      />
      {showBtn && (
        <button onClick={handleClick}>
          <X size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
