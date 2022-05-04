import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

function ToSearchDeparturesButton({doRedirect}) {

    const history = useHistory();

    useEffect(function(){
        if(doRedirect === "true"){
            redirect();
        }
    }, [doRedirect]);

    const redirect = function (event) {
        event.preventDefault();
        console.log("ToSearchDeparturesButton Pressed");
        history.push("/depSearch");
    };
  
    return (
        <button className="RedirectButton" onClick={redirect}>
            <h3>Vyhľadávať odchody</h3>
        </button>
    );
  }
  
  export default ToSearchDeparturesButton;