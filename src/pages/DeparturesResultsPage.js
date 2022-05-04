import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import DeparturesResultsContainer from '../components/depResComponents/DeparturesResultsContainer';
import React, { useState, useEffect } from 'react';
import DeparturesResultsSetParams from '../components/depResComponents/DeparturesResultsSetParams';

function DeparturesResultsPage({ match, location,  openLabMessage, onReactedToOpenLabMessage}) {

    /*const queryString = require('query-string');
    const parsed = queryString.parse(location.search);
    console.log(parsed);*/

    const history = useHistory();

    const [departures, setDepartures] = useState([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);

    useEffect(function(){
      if(openLabMessage){
        try{
          switch (openLabMessage.intents[0].name) {
            case "to_home":
              onReactedToOpenLabMessage();
              history.push("/");
              break;
            case "search_departures":
              onReactedToOpenLabMessage();
              history.push("/depSearch");
              break;
            default:
              console.log("Intent can not be handle at this page!");
          }
  
        } catch(err){
          console.log("Error while approaching to wit message: " + err);
        }
      }
    }, [openLabMessage]);

    useEffect(function(){
        fetch('https://infinite-eyrie-03685.herokuapp.com/cp/dep' + location.search)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseJSON => {
                setDepartures(responseJSON.departuresList);
                setTitle(responseJSON.from);
                console.log(responseJSON.departuresList);
                //console.log(responseJSON.from);
                if(responseJSON.error !== "No results error"){
                  setError(false);
                }else{
                  setError(true);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
      }, [location.search]);

    return (
      <div className="DeparturesResults">
          {/*{message}*/}
          <div className="ResultsPageFlexContainer">
            <div className="ResultsLeftBox"><DeparturesResultsSetParams departuresTitle={title} urlPart={location.search} openLabMessage={openLabMessage} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/></div>
            {error === true && (
              <div className="ResultsRightBox">
                <div className="ErrorMessageContainer">
                  <div className="PrimaryErrorMessage">Chyba:</div>
                  <div className="SecondaryErrorMessage">
                    <div><b>Nepodarilo sa nám zobraziť výsledky!</b></div>
                    <div>Vyskúšajte prosím zmenu parametrov vyhľadávania</div>
                  </div>
                </div>
              </div>
            )}
            {error === false && (
              <div className="ResultsRightBox"><DeparturesResultsContainer departures={departures}/></div>
            )}
          </div>
      </div>
    );
  }
  
  export default DeparturesResultsPage;