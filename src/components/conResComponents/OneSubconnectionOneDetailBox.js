import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function OneSubconnectionOneDetailBox( oneSubconnectionInfo ) {

    //console.log(oneSubconnectionInfo);

    return (
      <div className="OneSubconnectionOneDetailBox">
          <div className="OneSubconnectionOneDetailBox-Time">
            {oneSubconnectionInfo.time}  
          </div>
          <div className="OneSubconnectionOneDetailBox-Station">
            <div>{oneSubconnectionInfo.station}</div>
            {oneSubconnectionInfo.platform !== "" && (
                <div className="OneSubconnectionOneDetailBox-Platform">
                    Nástupište: {oneSubconnectionInfo.platform}
                </div>
            )}
          </div>
      </div>
    );
  }

  export default OneSubconnectionOneDetailBox;