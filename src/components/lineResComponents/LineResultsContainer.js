import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneHourLineResultsBox from './OneHourLineResultsBox';
import OneStationLineResultsBox from './OneStationLineResultsBox';
import OneLineResultsNote from './OneLineResultsNote';

function LineResultsContainer({ departuresFromStation, date, lineStations, notes }) {

    //console.log(departuresFromStation);

    const [actualHour, setActualHour] = useState("");

    useEffect(function(){
      setActualHour(new Date().getHours());
    }, [departuresFromStation]);

    return (
      <div className="LineResultsContainer">
          <div className="LineResultsStationsBox">
            <div className="LineResultsTimeBoxHeader">
              <div className="LineResultsStationBoxHeaderMinuteTitle">Minúta</div>
              <div className="LineResultsStationBoxHeaderStationTitle">Zastávka</div>
            </div>
            {lineStations.map((lineStationsOneElem, i) => <OneStationLineResultsBox lineStationsOneElem={lineStationsOneElem} key={i}/>)}
          </div>
          <div className="LineResultsTimesBox">
            <div className="LineResultsTimesBoxDateTitle">
              {date}
            </div>
            <div className="LineResultsTimeBoxHeader">
              <div className="LineResultsTimeBoxHeaderHourTitle">Hodina</div>
              <div className="LineResultsTimeBoxHeaderMinuteTitle">Minúta</div>
            </div>
            {departuresFromStation.map((hourDeparturesFromStation, i) => <OneHourLineResultsBox hourDeparturesFromStation={hourDeparturesFromStation} key={i} actualHour={actualHour}/>)}
            <div className="LineResultsNotes">
              {notes.map((note, i) => <OneLineResultsNote note={note} key={i}/>)}
            </div>
          </div>
          {/*<div>{departures.map((departure, i) => <OneDepartureBox departureInfo={departure} key={i}/>)}</div>*/}
      </div>
    );
  }
  
  export default LineResultsContainer;