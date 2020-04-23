const colors = {
  main: "#4c9aed",
  green: "#56cd82",
  red: "#ef6960",
};

const formatterNumbers = (number) => {
  if (number > 999999) {
    return `${(number / Math.pow(10, 6)).toFixed(1)}m`;
  } else if (number > 999) {
    return `${(number / Math.pow(10, 3)).toFixed(1)}k`;
  } else {
    return number;
  }
};

const reformatProvinceToCountry = (data) => {
  const countries = [];

  data.forEach(({ countryRegion }) => {
    let confirmed = 0;
    let recovered = 0;
    let deaths = 0;

    if (countries.find((c) => c.countryRegion === countryRegion)) return;

    const provinces = data.filter((p) => p.countryRegion === countryRegion);

    provinces.forEach((p) => {
      confirmed += p.confirmed;
      recovered += p.recovered;
      deaths += p.deaths;
    });

    countries.push({
      countryRegion,
      confirmed,
      recovered,
      deaths,
    });
  });

  return countries;
};

const sortedCountries = (
  countries,
  options = { sortedBy: "cases", order: "desc" }
) => {
  const { sortedBy, order } = options;

  const sortedCountriesArr = countries.sort((a, b) => {
    if (sortedBy === "cases") {
      return order === "desc"
        ? b.confirmed - a.confirmed
        : a.confirmed - b.confirmed;
    }

    if (sortedBy === "names") {
      return order === "desc"
        ? a.countryRegion.localeCompare(b.countryRegion)
        : b.countryRegion.localeCompare(a.countryRegion);
    }

    return 0;
  });

  return sortedCountriesArr;
};

const filterCountries = (countries, value) => {
  if (value === "") {
    return countries;
  }
  return countries.filter(({ countryRegion }) =>
    countryRegion.toLowerCase().includes(value.trim().toLowerCase())
  );
};

export {
  colors,
  formatterNumbers,
  reformatProvinceToCountry,
  sortedCountries,
  filterCountries,
};
