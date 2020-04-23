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
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [value, setValue] = useState("");
  const [sorted, setSorted] = useState({
    sortedBy: "cases",
    order: "desc",
  });

  const { confirmedCases, error } = useContext(Context);

  useEffect(() => {
    // Formate Data
    const reformatResponse = reformatProvinceToCountry(confirmedCases);
    // Sorted countries
    const sortedResponse = sortedCountries(reformatResponse, sorted);
    setCountries(sortedResponse);
    // Filter countries
    const filterResponse = filterCountries(sortedResponse, value);

    setFiltredCountries(filterResponse);
    setLoading(false);
  }, [confirmedCases, sorted, value]);

  const handleSortedOptions = (options) => {
    setSorted(options);
    setCountries(sortedCountries(countries, options));
  };

  const handleChange = (value) => {
    setValue(value);
    setFiltredCountries(filterCountries(countries, value));
  };

  if (loading) return <SpinnerLoader />;

  if (error) return <Error />;

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
