import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import SelectControl from "@material-ui/core/Switch";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import ListItem from "@material-ui/core/ListItem";
import Weather from "./currentWeather/Weather";
import CurrentDate from "./CurrentDate";
import getWeather from "../actions/weatherAction";
import Form from "./currentWeather/Form";
import SunriseSunset from "./sunrise-sunset/SunriseSunset";
import Background from "./currentWeather/Background";
import "./containerWeather.css";
import { Button } from "@material-ui/core";

const URL = "https://eu1.locationiq.com/v1/reverse.php?key=311b5ecb2cf7bc&lat=";
class ContainerWeather extends Component {
  state = {
    checked: false
  };

  handleChange = event => {
    const { data, getWeather } = this.props;
    const { city } = data;
    this.setState({ checked: event.target.checked }, () => {
      const { checked } = this.state;
      if (checked) getWeather(city, true, "imperial");
      else getWeather(city, true, "metric");
    });
  };

  getLoc = () => {
    const { data, getWeather } = this.props;
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      // mettre a jour les states apres la recuperation des lat et long
      axios(`${URL}${latitude}&lon=${longitude}&format=json`).then(dataLoc => {
        getWeather(dataLoc.data, false);
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
          <Form checked={checked} />
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
  { getWeather }
)(ContainerWeather);
