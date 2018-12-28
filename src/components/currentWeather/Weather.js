import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "./Icon";
import "./weather.css";

class Weather extends Component {
  componentDidMount = () => {};

  render() {
    const { data, checked } = this.props;
    const { city, description, temperature, icon, speedWind } = data;
    return (
      <div className="weather-discription">
        <div className="Weather">
          <p>{city}</p>
          <p>
            {temperature}
            {checked ? `°F` : `°C`}
          </p>
          <Icon icon={icon} />
          <p>{description}</p>
          <p>Vitesse du vent: {speedWind}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.weatherReducer.weatherData
});

Weather.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string,
    description: PropTypes.string,
    temperature: PropTypes.number,
    icon: PropTypes.string,
    speedWind: PropTypes.number
  }).isRequired,
  checked: PropTypes.bool.isRequired
};
export default connect(mapStateToProps)(Weather);
