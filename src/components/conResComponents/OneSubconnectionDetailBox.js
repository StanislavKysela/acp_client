import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneSubconnectionOneDetailBox from './OneSubconnectionOneDetailBox';
import ArrowPicture from '../../icons/arrow.png';
import MicPicture from '../../icons/mic.png';

function OneSubconnectionDetailBox( {subconnectionInfo, changeDetailsConnectionNumber, detailsMode} ) {

    return (
      <div className="OneSubconnectionDetailBox">
          <div className="OneSubconnectionDetailBox-Walk">
            {detailsMode === true && (
              <div className="SubconnectionDetailsSuggestionContainer">
                <div className="PictureArrow"><img src={MicPicture} alt="arrowPicture" width="20vh"/></div>
                <span className="OneSubconnectionDetailBox-DetailsLink"onClick={() => changeDetailsConnectionNumber(subconnectionInfo.id)}>"Detaily {subconnectionInfo.id}. spojenia"</span>
              </div>
            )}
            <div className="SubconnectionDetailsWalkTime">
              {subconnectionInfo.walkTime}
            </div>
          </div>
          <div className="OneSubconnectionDetailBox-NotWalk">
            <div className="OneSubconnection-VehicleName">
                {subconnectionInfo.vehicleName}
            </div>
            <div className="PictureArrow"><img src={ArrowPicture} alt="arrowPicture" width="30vh"/></div>
            <div className="OneSubconnection-VehicleDetails">
                <OneSubconnectionOneDetailBox 
                    time={subconnectionInfo.startTime} 
                    station={subconnectionInfo.startStation} 
                    platform={subconnectionInfo.startStationPlatform}
                />
                <OneSubconnectionOneDetailBox 
                    time={subconnectionInfo.finishTime} 
                    station={subconnectionInfo.finishStation} 
                    platform={subconnectionInfo.finishStationPlatform}
                />
            </div>
          </div>
    </div>
    );
  }

  export default OneSubconnectionDetailBox;