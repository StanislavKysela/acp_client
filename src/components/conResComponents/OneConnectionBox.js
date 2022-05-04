import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneConnectionTitleBox from './OneConnectionTitleBox';
import OneConnectionDetailBox from './OneConnectionDetailBox';

function OneConnectionBox({ connectionInfo, toShowDetails }) {

    //console.log("tututu");
    //console.log(connectionInfo);

    return (
      <div className="OneConnectionBox">
          <OneConnectionTitleBox titleInfo={connectionInfo} toShowDetails={toShowDetails}/>
          <OneConnectionDetailBox connectionInfo={connectionInfo} changeDetailsConnectionNumber={0} detailsMode={false}/>
      </div>
    );
  }

  export default OneConnectionBox;