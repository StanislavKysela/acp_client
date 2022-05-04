import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function DateFormComponent(props) {

    const [date, setDate] = useState(props.value);

    useEffect(function(){
        setDate(props.value);
    }, [props.value]);
  
    return (
      <div className="DateFormComponent">
          <label>
            {props.resForm === false && (
              <div className="TextInputContainer">
                <div className="VerticalFormComponentName">
                  Dátum:
                </div>
                <textarea name={"dateInput"} value={date} onChange={props.handleChange} rows={"1"} cols={"12"} />
                <div className="VoiceCommandSuggestion">
                  <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                  "Nastaviť dátum na"
                </div>
              </div>
            )}
            {props.resForm === true && (
              <div>
                <div className="TextInputContainer">
                  <div className="VerticalFormComponentNameRes">
                    Dátum:
                  </div>
                  <textarea name={"dateInput"} value={date} onChange={props.handleChange} rows={"1"} cols={"12"} />
                </div>
                <div className="VoiceCommandSuggestionResUnder">
                  <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="15vh"/></span>
                  "Nastaviť dátum na"
                </div>
              </div>
            )}
          </label>
      </div>
    );
  }
  
  export default DateFormComponent;