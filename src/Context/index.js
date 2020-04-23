import React, { useState, useEffect } from "react";
import { getData, getCountryData, getConfirmedCases } from "./../api";

const Context = React.createContext();

const Provider = ({ children }) => {
  // World Data
  const [data, setData] = useState([]);
  // Confirmed cases data
  const [confirmedCases, setConfirmedCases] = useState([]);
  // Loading Data
  const [loading, setLoading] = useState(true);
  // Country selected
  const [selectCountry, setSelectCountry] = useState(null);
  // Loading country selected data
  const [loadingContent, setLoadingContent] = useState(false);
  // Error fetching data
  const [error, setError] = useState(false);

  // Get world & confirmed cases data
  const fetchData = async () => {
    try {
      // Get world data
      const globalData = await getData();
      setData(globalData);
      // Get confirmed cases data
      const confirmedCases = await getConfirmedCases();
      setConfirmedCases(confirmedCases);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(true);
      setLoading(false);
    }
  };

  // Get content (world/country selected) data
  const fetchContentData = async (country) => {
    try {
      // get data for counters & piechart
      const { confirmed, recovered, deaths } = country
        ? await getCountryData(country)
        : await getData(country);
      setData({ confirmed, recovered, deaths });
      setLoadingContent(false);
    } catch (e) {
      // Catch errors
      console.error(e);
      setError(true);
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle country selected
  const handleSelectCountry = (country) => {
    setSelectCountry(country);
    setLoadingContent(true);
    fetchContentData(country);
  };

  return (
    <Context.Provider
      value={{
        data,
        error,
        confirmedCases,
        loading,
        loadingContent,
        selectCountry,
        handleSelectCountry,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
