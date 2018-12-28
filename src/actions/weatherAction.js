import axios from "axios";
import {
  FETCH_METEO_SUCCESS,
  FETCH_METEO_FAILURE,
  FETCH_METEO_STARTED
} from "./types";

// API key
const API_KEY = "588b34ef0ccd1ce25e0cd600e9e852fb";
/**
 * @function fetchWeatherStarted
 * @returns objet
 * @param nothing
 * action to dipatch when the axios started
 */
const fetchWeatherStarted = () => ({
  type: FETCH_METEO_STARTED
});

/**
 * @function fetchWeatherFailure
 * @returns object
 * @param nothing
 * action to dispatch if the axios failure
 */
const fetchWeatherFailure = () => ({
  type: FETCH_METEO_FAILURE,
  payload: {
    error: true
  }
});
/**
 * @function getCity
 * @returns string
 * @param object
 * get the name of the city
 */
const getCity = address => {
  if (address.city !== undefined) return address.city;
  if (address.city_district !== undefined) return address.city_district;
  if (address.locality !== undefined) return address.locality;
  if (address.town !== undefined) return address.town;
  if (address.borough !== undefined) return address.borough;
  if (address.municipality !== undefined) return address.municipality;
  if (address.village !== undefined) return address.village;
  if (address.hamlet !== undefined) return address.hamlet;
  if (address.quarter !== undefined) return address.quarter;
  if (address.neighbourhood !== undefined) return address.neighbourhood;
  return false;
};
/**
 * @function fetchWeatherSuccess
 * @returns object
 * @param object
 * action to dispatch  if the axios success
 */
const fetchWeatherSuccess = dataMeteo => ({
  type: FETCH_METEO_SUCCESS,
  payload: {
    temperature: Math.floor(dataMeteo.main.temp),
    city: dataMeteo.name,
    date: dataMeteo.dt,
    description: dataMeteo.weather[0].description,
    icon: dataMeteo.weather[0].icon,
    imgBackground: dataMeteo.weather[0].icon,
    speedWind: dataMeteo.wind.speed,
    windDegree: dataMeteo.wind.deg,
    sunrise: dataMeteo.sys.sunrise,
    sunset: dataMeteo.sys.sunset
  }
});
/**
 * @function getWeather
 * @returns object
 * @param any
 * @param bool
 * @param string
 * start the axios to get the data
 * <isCity = true  data is string>
 * <isCity = false  data is an objet>
 *<unity  is stirng to choose the untity of the results metric or imperial>
 */
const getWeather = (data, isCity, unity = "metric") => dispatch => {
  dispatch(fetchWeatherStarted());
  let city = null;
  if (!isCity) city = getCity(data.address);
  else city = data;
  const units = `&units=${unity}`;
  const lang = "&lang=fr";
  // fetch meteo
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}${units}${lang}&APPID=${API_KEY}`
    )
    .then(dataMeteo => dispatch(fetchWeatherSuccess(dataMeteo.data)))
    .catch(err => dispatch(fetchWeatherFailure(err)));
};

export default getWeather;
