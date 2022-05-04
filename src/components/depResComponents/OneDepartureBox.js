import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import OneDepartureTimeBox from './OneDepartureTimeBox';
import BusPicture from '../../icons/bus.png';
import TramPicture from '../../icons/tram.png';
import TrainPicture from '../../icons/train.png';

function OneDepartureBox({ departureInfo }) {

    //console.log(departureInfo);
    const [vehiclePicture, setVehiclePicture] = useState();

    useEffect(function(){
      let regBus = new RegExp(/(?:bus)/i); 
      let regTram = new RegExp(/(?:elektr)/i);
      if(regBus.test(departureInfo.vehicle)){
        setVehiclePicture(BusPicture);
      }else if(regTram.test(departureInfo.vehicle)){
        setVehiclePicture(TramPicture);
      }else{
        setVehiclePicture(TrainPicture);
      }
    }, [departureInfo]);

    return (
      <div className="OneDepartureFlexContainer">
          <div className="DeparturePicture"><img src={vehiclePicture} alt="vehiclePicture" width="34vh"/></div>
          <div className="DepartureName">
              <div className="DepartureNameVehicle">{departureInfo.vehicle}</div>
              <div>Smer: <b>{departureInfo.direction}</b></div>
          </div>

          {departureInfo.platform === "" && (
            <div className="DepartureViaWider">
              <div className="DepartureViaText">{departureInfo.via}</div>
              <div>Prepravca: {departureInfo.operator}</div>    
            </div>
          )}
          
          {departureInfo.platform !== "" && (
            <div className="DepartureWithPlatformContainer">
              <div className="DepartureVia">
                  <div className="DepartureViaText">{departureInfo.via}</div>
                  <div className="OperatorText">Prepravca: {departureInfo.operator}</div>    
              </div>
              <div className="DeparturePlatform">
                <div>Nást. </div> 
                <div className="DeparturePlatformText">   {departureInfo.platform}</div>
              </div>
            </div>
          )}
          <OneDepartureTimeBox departureInfo={departureInfo}/>
      </div>
    );
  }
  
  export default OneDepartureBox;