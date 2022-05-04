import React, { useState, useEffect } from 'react';

function HomePageFormComponent(props) {

    const [toStation, setToStation] = useState(props.value);

    useEffect(function(){
        setToStation(props.value);
    }, [props.value]);
  
    return (
      <div className="HomePageFormComponent">
          <label>
              <div className="TextInputContainer">
                <textarea name={"toStationInput"} value={toStation} onChange={props.handleChange} rows={"1"} cols={"40"} />
              </div>
          </label>
      </div>
    );
  }
  
  export default HomePageFormComponent;