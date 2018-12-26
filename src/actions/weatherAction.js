import {
  FETCH_METEO_SUCCESS,
  FETCH_METEO_FAILURE,
  FETCH_METEO_STARTED
} from './types'
import axios from 'axios'

// Clés API
const api_Key_Current_Weather = "588b34ef0ccd1ce25e0cd600e9e852fb";
//588b34ef0ccd1ce25e0cd600e9e852fb -- clef de Delph
//0f53c26a9c88a54d8706c8b3c9d2b880 -- clef de quelqu'un
//methode GetMeteoPollution qui lance le fetch de meteo et la pollution

export const getWeather = (data, bool) => dispatch => {
  dispatch(fetchWeatherStarted())
  let city = null
  if (bool)
    city = getCity(data.address)
  else
    city = data
  const units = "&units=metric";
  const lang = "&lang=fr";
  //fetch meteo
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}${units}${lang}&APPID=${api_Key_Current_Weather}`)
    .then(dataMeteo => dispatch(fetchWeatherSuccess(dataMeteo.data)))
    .catch(err => dispatch(fetchWeatherFailure(err.message)))
}


const fetchWeatherSuccess = dataMeteo => ({
  type: FETCH_METEO_SUCCESS,
  payload: {
    temperature: Math.floor(dataMeteo.main.temp),
    city: dataMeteo.name,
    date: dataMeteo.dt,
    description: dataMeteo.weather[0].description,
    icon: dataMeteo.weather[0].icon, //sert à afficher l'icone et le background.
    imgBackground: dataMeteo.weather[0].icon, //sert à afficher le background.
    speedWind: dataMeteo.wind.speed,
    windDegree: dataMeteo.wind.deg,
    sunrise: dataMeteo.sys.sunrise,
    sunset: dataMeteo.sys.sunset
  }
});

const fetchWeatherStarted = () => ({
  type: FETCH_METEO_STARTED
});

const fetchWeatherFailure = error => ({
  type: FETCH_METEO_FAILURE,
  payload: {
    error
  }
});




const getCity = (address) => {
  if (address.city !== undefined)
    return (address.city);
  else if (address.city_district !== undefined)
    return (address.city_district);
  else if (address.locality !== undefined)
    return (address.locality);
  else if (address.town !== undefined)
    return (address.town);
  else if (address.borough !== undefined)
    return (address.borough);
  else if (address.municipality !== undefined)
    return (address.municipality);
  else if (address.village !== undefined)
    return (address.village);
  else if (address.hamlet !== undefined)
    return (address.hamlet);
  else if (address.quarter !== undefined)
    return (address.quarter);
  else if (address.neighbourhood !== undefined)
    return (address.neighbourhood);
}