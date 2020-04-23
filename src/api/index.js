const url = "https://covid19.mathdro.id/api";

const getData = async () => {
  return await fetch(url).then((res) => res.json());
};

const getCountryData = async (country) => {
  return await fetch(`${url}/countries/${country}`).then((res) => res.json());
};

const getConfirmedCases = async (country) => {
  return await fetch(`${url}/confirmed`).then((res) => res.json());
};

export { getData, getCountryData, getConfirmedCases };
