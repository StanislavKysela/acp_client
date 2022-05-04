import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function OneHourLineResultsBox({ hourDeparturesFromStation, actualHour }) {

    //console.log(hourDeparturesFromStation);

    const [hour, setHour] = useState("");
    const [minutes, setMinutes] = useState("");

    useEffect(function(){
        let splittedDep = hourDeparturesFromStation.split(": ");
        //console.log(splittedDep);
        if(splittedDep[1] !== ""){
            setHour(splittedDep[0]);
            setMinutes(splittedDep[1]);
        }
      }, [hourDeparturesFromStation]);

    return (
      <div className="OneHourLineResultsBox">
        {actualHour.toString() === hour && (
            <div className="OneHourDepartureContainer">
                <div className="OneHourDepartureHourTitleBlue">
                    {hour}
                </div>
                <div className="OneHourDepartureMinutesTitleBlue">
                    {minutes}
                </div>
            </div>
        )}
        {actualHour.toString() !== hour && (
            <div className="OneHourDepartureContainer">
                <div className="OneHourDepartureHourTitle">
                    {hour}
                </div>
                <div className="OneHourDepartureMinutesTitle">
                    {minutes}
                </div>
            </div>
        )}
      </div>
    );
  }
  
  export default OneHourLineResultsBox;