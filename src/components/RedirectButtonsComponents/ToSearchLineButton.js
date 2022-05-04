import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

function ToSearchLineButton({doRedirect}) {

    const history = useHistory();

    useEffect(function(){
        if(doRedirect === "true"){
            redirect();
        }
    }, [doRedirect]);

    const redirect = function (event) {
        event.preventDefault();
        console.log("ToSearchLineButton Pressed");
        history.push("/lineSearch");
    };
  
    return (
        <button className="RedirectButton" onClick={redirect}>
            <h3>Vyhľadávať linkové CP</h3>
        </button>
    );
  }
  
  export default ToSearchLineButton;