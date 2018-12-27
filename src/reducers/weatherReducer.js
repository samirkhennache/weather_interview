import {
  FETCH_METEO_SUCCESS,
  FETCH_METEO_FAILURE,
  FETCH_METEO_STARTED
} from '../actions/types';

const initialState = {
  loadedData: false,
  loadingData: false,
  weatherData: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_METEO_STARTED:
      return {
        ...state,
        loadingData: true
      }
    case FETCH_METEO_SUCCESS:
      return {
        ...state,
        loadingData: false,
        loadedData: true,
        error: false,
        weatherData: action.payload
      }
    case FETCH_METEO_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state
  }
}