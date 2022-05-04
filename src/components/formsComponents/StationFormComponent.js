import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function StationFormComponent(props) {

    const [station, setStation] = useState(props.value);
    const [textAreaName, setTextAreaName] = useState("");

    useEffect(function(){
      if(props.type === "from"){
        setTextAreaName("fromStationInput");
      }else if(props.type === "to"){
        setTextAreaName("toStationInput");
      }else{
        setTextAreaName("viaStationInput");
      }
    }, []);

    useEffect(function(){
        setStation(props.value);
    }, [props.value]);
  
    return (
      <div className="StationFormComponent">
          <label>
            {props.resForm === false && (
              <div>
                {props.type === "from" && (
                  <p>
                    Začiatočná zastávka:
                  </p>
                )}
                {props.type === "to" && (
                  <p>
                    Cieľová zastávka:
                  </p>
                )}
                {props.type === "via" && (
                  <p>
                    Cez:
                  </p>
                )}
                <div className="TextInputContainer">
                  {props.mandatory === true &&(
                    <textarea name={textAreaName} className={"TextAreaMandatory"} value={station} onChange={props.handleChange} rows={"1"} cols={"30"} />
                  )}
                  {props.mandatory === false &&(
                    <textarea name={textAreaName} value={station} onChange={props.handleChange} rows={"1"} cols={"30"} />
                  )}
                  {props.type === "from" && (
                    <div className="VoiceCommandSuggestion">
                      <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                      "Nastaviť začiatočnú zastávku na"
                    </div>
                  )}
                  {props.type === "to" && (
                    <div className="VoiceCommandSuggestion">
                      <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                      "Nastaviť cieľovú zastávku na"
                    </div>
                  )}
                  {props.type === "via" && (
                    <div className="VoiceCommandSuggestion">
                      <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                      "Nastaviť cez na
                    </div>
                  )}
                </div>
              </div>
            )}

            {props.resForm === true && (
              <div>
                {props.type === "from" && (
                  <p className="TextInputLabelRes">
                    Začiatočná zastávka:
                  </p>
                )}
                {props.type === "to" && (
                  <p className="TextInputLabelRes">
                    Cieľová zastávka:
                  </p>
                )}
                {props.type === "via" && (
                  <p className="TextInputLabelRes">
                    Cez:
                  </p>
                )}
                <div className="TextInputContainer">
                  {props.mandatory === true &&(
                    <textarea name={textAreaName} className={"TextAreaError"} value={station} onChange={props.handleChange} rows={"1"} cols={"25"} />
                  )}
                  {props.mandatory === false &&(
                    <textarea name={textAreaName} value={station} onChange={props.handleChange} rows={"1"} cols={"25"} />
                  )}
                </div>
                {props.type === "from" && (
                  <div className="VoiceCommandSuggestionResUnder">
                    <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="15vh"/></span>
                    "Nastaviť začiatočnú zastávku na"
                  </div>
                )}
                {props.type === "to" && (
                  <div className="VoiceCommandSuggestionResUnder">
                    <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="15vh"/></span>
                    "Nastaviť cieľovú zastávku na"
                  </div>
                )}
                {props.type === "via" && (
                  <div className="VoiceCommandSuggestionResUnder">
                    <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="15vh"/></span>
                    "Nastaviť cez na
                  </div>
                )}
              </div>
            )}
          </label>
      </div>
    );
  }
  
  export default StationFormComponent;