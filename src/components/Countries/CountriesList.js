import React from "react";
import CountriesItem from "./CountriesItem";

const CountriesList = ({ countries, handleSideBar }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <CountriesItem
          key={index}
          country={country}
          handleSideBar={handleSideBar}
        />
      ))}
    </ul>
  );
};

export default CountriesList;
