import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import getWeather from "../../actions/weatherAction";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: "white",
    opacity: 0.5,
    borderRadius: 5
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
    height: 55,
    marginTop: 16
  },
  input: {
    display: "none"
  }
});

class Form extends React.Component {
  state = {
    city: null
  };

  // Fetch SearchBar
  getData = e => {
    const { weather, checked } = this.props;
    const { city } = this.state;
    e.preventDefault(); // eviter que la page se recharge  a chaque recherche.
    if (checked) weather(city, true, "imperial");
    else weather(city, true, "metric");
  };

  handleChange = e => {
    this.setState({ city: e.target.value });
  };

  // RENDER ////////////////////////////////////////////////////////////
  render() {
    const { classes, error } = this.props;
    return (
      <form
        className="{classes.container} form-center"
        noValidate
        autoComplete="off"
        onSubmit={this.getData}
      >
        {!error && (
          <TextField
            label="Votre ville"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
        )}
        {error && (
          <TextField
            error
            label="Vérifiez votre saisie !"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Rechercher
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  data: state.weatherReducer.weatherData,
  error: state.weatherReducer.error
});
Form.propTypes = {
  checked: PropTypes.bool.isRequired,
  classes: PropTypes.func.isRequired,
  weather: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};
export default connect(
  mapStateToProps,
  { weather: getWeather }
)(withStyles(styles)(Form));
