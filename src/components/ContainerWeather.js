import React, { Component } from 'react'
import Weather from './Weather'
import { connect } from 'react-redux';
import { getWeather } from "../actions/weatherAction"
import axios from "axios"

const URL = "https://eu1.locationiq.com/v1/reverse.php?key=311b5ecb2cf7bc&lat="
class ContainerWeather extends Component {
  state = {}
  getLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
      //mettre a jour les states apres la recuperation des lat et long
      axios(`${URL}${latitude}&lon=${longitude}&format=json`)
        .then(dataLoc => {
          console.log("mes data ", dataLoc.data);
          this.props.getWeather(dataLoc.data, true)
        })
    })
  }
  componentDidMount = () => {
    this.getLoc();
  }

  render () {

    return (
      <div>
        <Weather />
      </div>
    );
  }
}

export default connect(null, { getWeather })(ContainerWeather);