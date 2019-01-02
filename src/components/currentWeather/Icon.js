import React from "react";
import PropTypes from "prop-types";

const Icon = ({ icon }) => (
  <div className="Icon">
    <img style={{ width: "40%" }} src={`/img/${icon}.png`} alt="icon weather" />
  </div>
);

Icon.defaultProps = {
  icon: ""
};
Icon.propTypes = {
  icon: PropTypes.string
};
export default Icon;
