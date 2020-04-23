import React, { useState, useEffect } from "react";
import { getData, getCountryData, getConfirmedCases } from "./../api";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectCountry, setSelectCountry] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState(false);

  // Get world and confirmed cases data
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
      const { confirmed, recovered, deaths } = country
        ? await getCountryData(country)
        : await getData(country);
      setData({ confirmed, recovered, deaths });
      setLoadingContent(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle select country
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
