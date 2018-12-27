import React, { Component } from "react";
import { connect } from "react-redux";
import "./sunriseSunset.css";
import moment from "moment";

class SunriseSunSet extends Component {
  render() {
    const { data } = this.props;
    const { sunrise, sunset } = data;
    const newSunrise = moment.unix(sunrise).format("hh:mm a");
    const newSunsetn = moment.unix(sunset).format("hh:mm a");

    return (
      <div className="SunriseSunSet">
        <p>Sunrise : {newSunrise}</p>
        <p>Sunset : {newSunsetn}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.weatherReducer.weatherData
});
export default connect(mapStateToProps)(SunriseSunSet);
