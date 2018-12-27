import axios from "axios";
import {
  FETCH_METEO_SUCCESS,
  FETCH_METEO_FAILURE,
  FETCH_METEO_STARTED
} from "./types";

// Clés API
const apiKeyCurrentWeather = "588b34ef0ccd1ce25e0cd600e9e852fb";
// 588b34ef0ccd1ce25e0cd600e9e852fb -- clef de Delph
// 0f53c26a9c88a54d8706c8b3c9d2b880 -- clef de quelqu'un
// methode GetMeteoPollution qui lance le fetch de meteo et la pollution
const fetchWeatherStarted = () => ({
  type: FETCH_METEO_STARTED
});

const fetchWeatherFailure = () => ({
  type: FETCH_METEO_FAILURE,
  payload: {
    error: true
  }
});

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
const fetchWeatherSuccess = dataMeteo => ({
  type: FETCH_METEO_SUCCESS,
  payload: {
    temperature: Math.floor(dataMeteo.main.temp),
    city: dataMeteo.name,
    date: dataMeteo.dt,
    description: dataMeteo.weather[0].description,
    icon: dataMeteo.weather[0].icon, // sert à afficher l'icone et le background.
    imgBackground: dataMeteo.weather[0].icon, // sert à afficher le background.
    speedWind: dataMeteo.wind.speed,
    windDegree: dataMeteo.wind.deg,
    sunrise: dataMeteo.sys.sunrise,
    sunset: dataMeteo.sys.sunset
  }
});
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
      `https://api.openweathermap.org/data/2.5/weather?q=${city}${units}${lang}&APPID=${apiKeyCurrentWeather}`
    )
    .then(dataMeteo => dispatch(fetchWeatherSuccess(dataMeteo.data)))
    .catch(err => dispatch(fetchWeatherFailure(err)));
};

export default getWeather;
