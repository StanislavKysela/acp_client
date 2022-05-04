import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function TimeFormComponent(props) {

    const [time, setTime] = useState(props.value);

    useEffect(function(){
        setTime(props.value);
    }, [props.value]);
  
    return (
      <div className="TimeFormComponent">
          <label>
            {props.resForm === false && (
              <div className="TextInputContainer">
                <div className="VerticalFormComponentName">
                  Čas:
                </div>
                <textarea name={"timeInput"} value={time} onChange={props.handleChange} rows={"1"} cols={"12"}/>
                <div className="VoiceCommandSuggestion">
                  <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                  "Nastaviť čas na"
                </div>
            </div>
            )}
            {props.resForm === true && (
              <div>
              <div className="TextInputContainer">
                <div className="VerticalFormComponentNameRes">
                  Čas:
                </div>
                <textarea name={"timeInput"} value={time} onChange={props.handleChange} rows={"1"} cols={"12"}/>
              </div>
              <div className="VoiceCommandSuggestionResUnder">
                <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="15vh"/></span>
                "Nastaviť čas na"
              </div>
            </div>
            )}
          </label>
      </div>
    );
  }
  
  export default TimeFormComponent;