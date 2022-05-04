import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function LineFormComponent(props) {

    const [line, setLine] = useState(props.value);

    useEffect(function(){
        setLine(props.value);
    }, [props.value]);
  
    return (
      <div className="LineFormComponent">
          <label>
              <p>
                Linka:
              </p>
              <div className="TextInputContainer">
                <textarea name={"lineInput"} className="TextAreaMandatory" value={line} onChange={props.handleChange} rows={"1"} cols={"30"} />
                <div className="VoiceCommandSuggestion">
                  <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                  "Nastaviť linku na"
                </div>
              </div>
          </label>
      </div>
    );
  }
  
  export default LineFormComponent;