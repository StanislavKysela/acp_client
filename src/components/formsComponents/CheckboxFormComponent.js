import React, { useState, useEffect } from 'react';
import MicPicture from '../../icons/mic.png';

function CheckboxComponent(props) {

    const [checked, setChecked] = useState(props.value);
    const [titleCap, setTitleCap] = useState(props.title);

    useEffect(function(){
      setTitleCap(props.title.charAt(0).toUpperCase() + props.title.slice(1));
  }, []);

    useEffect(function(){
        setChecked(props.value);
    }, [props.value]);
  
    return (
      <div className="CheckboxComponent">
          <label>
            <div className="TextInputContainer">
              <div className="VerticalFormComponentNameCheckbox">
                {titleCap}:
              </div>
              <input
                name="checkInput"
                type="checkbox"
                checked={checked}
                onChange={props.handleChange} />
              <div className="VoiceCommandSuggestion">
                <span className="PictureMic"><img src={MicPicture} alt="arrowPicture" width="22vh"/></span>
                "Vyhľadávať {props.title} / zrušiť"
              </div>
            </div>
          </label>
      </div>
    );
  }
  
  export default CheckboxComponent;