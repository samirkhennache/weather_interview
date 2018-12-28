import React from "react";
import PropTypes from "prop-types";
import "./background.css";

/*
Le composent Background récupère le nom de fichier de l'icon
provenant de l'API (par exemple 01d), pour récupérer le chemin d'accès
de l'image correspondante.
*/
const Background = ({ imgBackground }) => (
  <div>
    <img
      src={`img/bkg${imgBackground}.jpg`}
      className="weatherBackground"
      alt="current weather"
    />
  </div>
);
Background.propTypes = {
  imgBackground: PropTypes.string.isRequired
};

export default Background;
