import React from "react";
import "./currentDate.css";

/**
 * @function formatDate
 * @returns new date format
 * @param date
 * return the french format of the date
 */
const formatDate = date => {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];
  const dayName = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];
  const dayIndex = date.getDay();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  return `${dayName[dayIndex]} ${day} ${monthNames[monthIndex]}`;
};
const CurrentDate = () => (
  <div className="CurrentDate">{formatDate(new Date())}</div>
);
export default CurrentDate;
