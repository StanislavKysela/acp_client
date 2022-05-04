import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneSubconnectionDetailBox from './OneSubconnectionDetailBox';

function OneConnectionDetailBox({ connectionInfo, detailsMode, changeDetailsConnectionNumber }) {

    //console.log(connectionInfo);

    const [subconnectionsArray, setSubconnectionsArray] = useState([]);

    useEffect(function(){
        setSubconnectionsArray(connectionInfo.slice(1));
      }, [connectionInfo]);

    return (
      <div className="OneConnectionDetailBox">
          <div>{subconnectionsArray.map((subconnection, i) => <OneSubconnectionDetailBox 
                                                                  subconnectionInfo={subconnection} 
                                                                  key={i} 
                                                                  detailsMode={detailsMode}
                                                                  changeDetailsConnectionNumber={changeDetailsConnectionNumber}
                                                                  />
                )}
          </div>
      </div>
    );
  }

  export default OneConnectionDetailBox;