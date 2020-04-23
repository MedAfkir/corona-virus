const url = "https://covid19.mathdro.id/api";

// fetch data
const getData = async () => {
  return await fetch(url).then((res) => res.json());
};

// fetch country selected data
const getCountryData = async (country) => {
  return await fetch(`${url}/countries/${country}`).then((res) => res.json());
};

// fetch confirmed cases data
const getConfirmedCases = async (country) => {
  return await fetch(`${url}/confirmed`).then((res) => res.json());
};

export { getData, getCountryData, getConfirmedCases };
