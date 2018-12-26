import React, { Component } from 'react'
import { connect } from 'react-redux';

class Weather extends Component {

  componentDidMount = () => {
  }

  render () {
    console.log(this.props.data);

    return (
      <div>weather</div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.weatherReducer.weatherData
})
export default connect(mapStateToProps)(Weather);