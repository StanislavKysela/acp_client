import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneDepartureBox from './OneDepartureBox';

function DeparturesResultsContainer({ departures }) {

    return (
      <div className="DeparturesResultsContainer">
          <div>{departures.map((departure, i) => <OneDepartureBox departureInfo={departure} key={i}/>)}</div>
      </div>
    );
  }
  
  export default DeparturesResultsContainer;