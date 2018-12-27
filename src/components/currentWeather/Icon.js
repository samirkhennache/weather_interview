import React from "react";
import "./icon.css";

const Icon = ({ icon }) => (
  <div className="Icon">
    <img className="icon-meteo" src={`/img/${icon}.png`} alt="" />
  </div>
);
export default Icon;
