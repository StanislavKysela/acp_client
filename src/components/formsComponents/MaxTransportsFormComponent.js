import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function MaxTransportsFormComponent(props) {

    const [transports, setTransports] = useState(props.value);

    useEffect(function(){
        setTransports(props.value);
    }, [props.value]);
  
    return (
      <div className="MaxTransportsFormComponent">
          <label>
              <p>
                Maximálny počet prestupov:
              </p>
              <div className="TextInputContainer">
                <textarea name={"transportsInput"} value={transports} onChange={props.handleChange} rows={"1"} cols={"20"} />
                <div className="VoiceCommandSuggestion">
                  <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                  "Nastaviť maximálny počet prestupov na"
                </div>
              </div>
          </label>
      </div>
    );
  }
  
  export default MaxTransportsFormComponent;