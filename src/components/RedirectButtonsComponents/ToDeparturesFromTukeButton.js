import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

function ToDeparturesFromTukeButton({doRedirect}) {

    const history = useHistory();

    useEffect(function(){
        if(doRedirect === "true"){
            redirect();
        }
    }, [doRedirect]);

    const redirect = function (event) {
        event.preventDefault();
        console.log("ToDeparturesFromTukeButton Pressed");
        history.push("/depRes?vehicle=vlakbusmhd&from=technicka univerzita");
    };
  
    return (
        <button className="TukeDeparturesButton" onClick={redirect}>
            <h3>Odchody z TUKE</h3>
        </button>
    );
  }
  
  export default ToDeparturesFromTukeButton;