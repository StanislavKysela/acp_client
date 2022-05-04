import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function VehicleFormComponent(props) {

    const [vehicle, setVehicle] = useState(props.value);

    useEffect(function(){
        setVehicle(props.value);
    }, [props.value]);
  
    return (
      <div className="VehicleFormComponent">
          <label>
              {props.type === "city" && (
                <p>
                  MHD v meste:
                </p>
              )}
              {props.type === "vehicle" && (
                <p>
                  Typ dopravy:
                </p>
              )}
              <div className="TextInputContainer">
                <textarea name={"vehicleInput"} className={"TextAreaMandatory"} value={vehicle} onChange={props.handleChange} rows={"1"} cols={"20"}/>
                <div className="VoiceCommandSuggestion">
                  <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                  {props.type === "vehicle" && (
                    <div>"Zmeniť typ dopravy na"</div>
                  )}
                  {props.type === "city" && (
                    <div>"Zmeniť mesto na"</div>
                  )}
                </div>
              </div>
            </label>
      </div>
    );
  }
  
  export default VehicleFormComponent;