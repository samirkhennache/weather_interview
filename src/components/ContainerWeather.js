import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import SelectControl from "@material-ui/core/Switch";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Button } from "@material-ui/core";
import Weather from "./currentWeather/Weather";
import CurrentDate from "./CurrentDate";
import getWeather from "../actions/weatherAction";
import Form from "./currentWeather/Form";
import SunriseSunset from "./sunrise-sunset/SunriseSunset";
import Background from "./currentWeather/Background";
import "./containerWeather.css";

const URL = "https://eu1.locationiq.com/v1/reverse.php?key=311b5ecb2cf7bc&lat=";

class ContainerWeather extends Component {
  state = {
    checked: false
  };

  /**
   * @function handleChange
   * @returns nothing
   * @param event
   * handle the change event to get the name of the city
   */
  handleChange = event => {
    const { data, weather } = this.props;
    const { city } = data;
    this.setState({ checked: event.target.checked }, () => {
      const { checked } = this.state;
      if (checked) weather(city, true, "imperial");
      else weather(city, true, "metric");
    });
  };

  /**
   * @function getLoc
   * @returns nothing
   * @param nothing
   * get the current position using the IP address
   * convert this position to get the name of the city
   * start the action weather to get the weather data
   */
  getLoc = () => {
    const { weather } = this.props;
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      axios(`${URL}${latitude}&lon=${longitude}&format=json`).then(dataLoc => {
        weather(dataLoc.data, false);
      });
    });
  };

  Accueil = props => <Link to="/" {...props} />;

  Sunrise = props => <Link to="/sunriseSunset" {...props} />;

  componentDidMount = () => {
    this.getLoc();
  };

  render() {
    const { checked } = this.state;
    const { data } = this.props;
    const { imgBackground } = data;
    return (
      <BrowserRouter>
        <div>
          <CurrentDate />
          <div className="container-discription">
            <Button component={Link} to="/">
              <FiChevronLeft size="3em" className="prvious" />
            </Button>
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <div>
                      <SelectControl
                        checked={checked}
                        onChange={this.handleChange}
                        color="default"
                      />
                      <span>{checked ? `°F` : `°C`}</span>
                      <Weather checked={checked} {...props} />
                    </div>
                  )}
                />
                <Route exact path="/sunriseSunset" component={SunriseSunset} />
              </Switch>
              <Form checked={checked} />
            </div>
            <Button component={Link} to="/sunriseSunset">
              <FiChevronRight size="3em" className="next" />
            </Button>
            <Background imgBackground={imgBackground} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToprops = state => ({
  data: state.weatherReducer.weatherData
});

export default connect(
  mapStateToprops,
  { weather: getWeather }
)(ContainerWeather);
