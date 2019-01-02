import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./sunriseSunset.css";
import moment from "moment";

const SunriseSunSet = props => {
  const { sunrise, sunset } = props;
  const newSunrise = moment.unix(sunrise).format("hh:mm a");
  const newSunsetn = moment.unix(sunset).format("hh:mm a");
  return (
    <div className="SunriseSunSet">
      <p>Sunrise : {newSunrise}</p>
      <p>Sunset : {newSunsetn}</p>
    </div>
  );
};
const mapStateToProps = state => ({
  sunrise: state.weatherReducer.weatherData.sunrise,
  sunset: state.weatherReducer.weatherData.sunset
});
SunriseSunSet.propTypes = {
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired
};
export default connect(mapStateToProps)(SunriseSunSet);
