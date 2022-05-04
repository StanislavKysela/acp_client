import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneConnectionBox from './OneConnectionBox';

function ConResultsContainer({ allConnections, toShowDetails }) {

    //console.log(allConnections);

    return (
      <div className="ConResultsContainer">
          {/*<button onClick={() => showDetailsToggle("a")}>
            detaily
    </button>*/}
          <div>{allConnections.map((connection, i) => <OneConnectionBox connectionInfo={connection} key={i} toShowDetails={toShowDetails}/>)}</div>
      </div>
    );
  }
  
  export default ConResultsContainer;