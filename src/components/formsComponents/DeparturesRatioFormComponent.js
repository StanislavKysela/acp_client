import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function DeparturesRatioFormComponent(props) {

    const [departures, setDepartures] = useState(props.value);

    useEffect(function(){
        setDepartures(props.value);
    }, [props.value]);
  
    return (
      <div className="DeparturesRatioFormComponent">
            <label>
              Odchody
                <input className="RatioButton"
                    name="departuresRatio"
                    type="radio"
                    value="Departures"
                    checked={departures === "departures"}
                    onChange={props.handleChange}
                />
            </label>
            <label>
              Príchody
                <input
                    name="departuresRatio"
                    type="radio"
                    value="Arrivals"
                    checked={departures === "arrivals"}
                    onChange={props.handleChange}
                />
            </label>
            <div className="VoiceCommandSuggestionUnder">
                <span className="PictureMicUnder"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                "Nastaviť vyhľadávanie odchodov / príchodov"
            </div>
      </div>
    );
  }
  
  export default DeparturesRatioFormComponent;