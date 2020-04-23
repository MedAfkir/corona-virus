import React, { useState, useEffect, useContext } from "react";

import SpinnerLoader from "./../Loader";
import Error from "./../Error";
import SearchBar from "./../SearchBar";
import SortedCountries from "./../SortedCountries";
import CountriesList from "../Countries";

import { Context } from "./../../Context";

import {
  filterCountries,
  sortedCountries,
  reformatProvinceToCountry,
} from "./../../utils";

import cx from "classnames";
import styles from "./SideBar.module.scss";

const SideBar = ({ showSideBar, handleSideBar }) => {
  // All countries
  const [countries, setCountries] = useState([]);
  // Countries filtered by input value
  const [filtredCountries, setFiltredCountries] = useState([]);
  // Input value
  const [value, setValue] = useState("");
  // Countries sorting options
  const [sorted, setSorted] = useState({
    sortedBy: "cases",
    order: "desc",
  });

  // Get data from Context
  const { confirmedCases } = useContext(Context);

  useEffect(() => {
    // format provinces to countries
    const reformatResponse = reformatProvinceToCountry(confirmedCases);
    // Sorted countries
    const sortedResponse = sortedCountries(reformatResponse, sorted);
    setCountries(sortedResponse);
    // Filter countries
    const filterResponse = filterCountries(sortedResponse, value);

    setFiltredCountries(filterResponse);
  }, [confirmedCases, sorted, value]);

  // Handle countries sorting options
  const handleSortedOptions = (options) => {
    setSorted(options);
    setCountries(sortedCountries(countries, options));
  };

  // handle change input value
  const handleChange = (value) => {
    setValue(value);
    setFiltredCountries(filterCountries(countries, value));
  };

  return (
    <div className={cx(styles.sidebar, { [styles.hide]: !showSideBar })}>
      <div className={styles.sortedList}>
        <SearchBar value={value} handleChangeValue={handleChange} />
        <SortedCountries
          sorted={sorted}
          handleSortedOptions={handleSortedOptions}
        />
      </div>
      <CountriesList
        handleSideBar={handleSideBar}
        countries={filtredCountries}
      />
    </div>
  );
};

export default SideBar;
