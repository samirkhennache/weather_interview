import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { FiChevronRight } from "react-icons/fi";
import Icon from "./Icon";
import "./weather.css";

class Weather extends Component {
  componentDidMount = () => {};

  render() {
    const { data, checked } = this.props;
    const { city, description, temperature, icon, speedWind } = data;
    return (
      <div className="weather-discription">
        <Grid container className="container" justify="center">
          <Grid item xs={3} className="Weather">
            <p>{city}</p>
            <p>
              {temperature}
              {checked ? `°F` : `°C`}
            </p>
            <Icon icon={icon} />

            <p>{description}</p>
            <p>Vitesse du vent: {speedWind}</p>
          </Grid>
          <Grid container item xs={2} alignItems="center">
            <Grid item xs={12}>
              <FiChevronRight size="3em" />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.weatherReducer.weatherData
});
export default connect(mapStateToProps)(Weather);
