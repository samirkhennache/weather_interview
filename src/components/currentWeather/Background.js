import React from 'react';
import './background.css';

/*
Le composent Background récupère le nom de fichier de l'icon
provenant de l'API (par exemple 01d), pour récupérer le chemin d'accès
de l'image correspondante.
*/
const Background = ({ imgBackground }) => {
  return (
    <div>
      <img
        src={`img/bkg${imgBackground}.jpg`}
        className="weatherBackground"
        alt="current weather"
      />
    </div>
  )
}

export default Background;