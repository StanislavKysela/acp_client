import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function OneStationLineResultsBox({ lineStationsOneElem }) {

    console.log(lineStationsOneElem);

    return (
      <div className="OneStationLineResultsBox">
          {lineStationsOneElem[0] !== "0" && (
            <div className="OneStationDepartureContainer">
                <div className="OneStationDepartureMinuteTitle">
                    {lineStationsOneElem[0]}
                </div>
                <div className="OneStationDepartureStationTitle">
                    {lineStationsOneElem[1]}
                </div>
            </div>
          )}
          {lineStationsOneElem[0] === "0" && (
            <div className="OneStationDepartureContainer">
                <div className="OneStationDepartureMinuteTitleBlue">
                    {lineStationsOneElem[0]}
                </div>
                <div className="OneStationDepartureStationTitleBlue">
                    {lineStationsOneElem[1]}
                </div>
            </div>
          )}
      </div>
    );
  }
  
  export default OneStationLineResultsBox;