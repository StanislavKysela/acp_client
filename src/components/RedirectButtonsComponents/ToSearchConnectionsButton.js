import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

function ToSearchConnectionsButton({doRedirect}) {

    const history = useHistory();

    useEffect(function(){
        if(doRedirect === "true"){
            redirect();
        }
    }, [doRedirect]);

    const redirect = function (event) {
        event.preventDefault();
        console.log("ToSearchConnectionsButton Pressed");
        history.push("/conSearch");
    };
  
    return (
        <button className="RedirectButton" onClick={redirect}>
            <h3>Vyhľadávať spojenia</h3>
        </button>
    );
  }
  
  export default ToSearchConnectionsButton;