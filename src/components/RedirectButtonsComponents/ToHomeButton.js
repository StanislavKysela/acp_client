import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

function ToHomeButton({doRedirect}) {

    const history = useHistory();

    useEffect(function(){
        if(doRedirect === "true"){
            redirect();
        }
    }, [doRedirect]);

    const redirect = function (event) {
        event.preventDefault();
        console.log("ToHomeButton Pressed");
        history.push("/");
    };
  
    return (
        <button className="HomeButton" onClick={redirect}>
            <h3>Domov</h3>
        </button>
    );
  }
  
  export default ToHomeButton;