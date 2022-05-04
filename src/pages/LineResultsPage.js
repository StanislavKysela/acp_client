import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LineResultsSetParams from '../components/lineResComponents/LineResultsSetParams';
import LineResultsContainer from '../components/lineResComponents/LineResultsContainer';

function LineResultsPage({ match, location,  openLabMessage, onReactedToOpenLabMessage}) {

  const history = useHistory();

    const [departuresFromStation, setDeparturesFromStation] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [lineStations, setLineStations] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(function(){
      if(openLabMessage){
        try{
          switch (openLabMessage.intents[0].name) {
            case "to_home":
              onReactedToOpenLabMessage();
              history.push("/");
              break;
            case "search_lines":
              onReactedToOpenLabMessage();
              history.push("/lineSearch");
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
        fetch('https://infinite-eyrie-03685.herokuapp.com/cp/zcp' + location.search)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseJSON => {
                console.log(responseJSON);
                setTitle(responseJSON.title);
                setDate(responseJSON.date);
                setDeparturesFromStation(responseJSON.departuresFromStation);
                setLineStations(responseJSON.lineStations);
                setNotes(responseJSON.notes);
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
          <div className="ResultsPageFlexContainer">
            <div className="ResultsLeftBox"><LineResultsSetParams departuresTitle={title} urlPart={location.search} openLabMessage={openLabMessage} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/></div>
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
              <div className="ResultsRightBox"><LineResultsContainer departuresFromStation={departuresFromStation} date={date} lineStations={lineStations} notes={notes}/></div>
            )}
          </div>
      </div>
    );
  }
  
  export default LineResultsPage;