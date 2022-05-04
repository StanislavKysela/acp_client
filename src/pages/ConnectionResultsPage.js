import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ConResultsSetParams from '../components/conResComponents/ConResultsSetParams';
import ConResultsContainer from '../components/conResComponents/ConResultsContainer';
import ConnectionDetailsSummary from '../components/conDetailsResComponents/ConnectionDetailsSummary';
import ConnectionDetailsSubconnection from '../components/conDetailsResComponents/ConnectionDetailsSubconnection';
import { changeNumberToNumericIfPossible } from '../functions/correctionOfParameters';

function ConnectionResultsPage({ match, location,  openLabMessage, onReactedToOpenLabMessage}) {

    const history = useHistory();
    
    const [allConnections, setAllConnections] = useState([]);
    const [title, setTitle] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [detailsConnectionNumber, setDetailsConnectionNumber] = useState(0);  //ktore z celkovych spojeni idem zobrazit do detailov
    const [detailsSubconnectionNumber, setDetailsSubconnectionNumber] = useState(1);  //ktore z subspojeni zobrazujem v detailoch
    const [error, setError] = useState(false);

    useEffect(function(){
      if(openLabMessage){
        try{
          switch (openLabMessage.intents[0].name) {
            case "to_home":
              onReactedToOpenLabMessage();
              history.push("/");
              break;
            case "search_connections":
              onReactedToOpenLabMessage();
              history.push("/conSearch");
              break;
            case "show_connection_details":
              let arrOfEntitiesObjects = [];
              Object.keys(openLabMessage.entities).forEach((key) => {   //tvorba pola s objektami druhov entit
                arrOfEntitiesObjects.push(key);
              })
              openLabMessage.entities[arrOfEntitiesObjects].forEach(element => {  //prechadzanie obsahu entit na zaklade pola s objektami druhov entit
                let reg = new RegExp(/^\d+$/);
                let numericValue = changeNumberToNumericIfPossible(element.value);
                if(element.name === "number_of_connection" && reg.test(numericValue)){  //kontrola, ci je ta entita spravneho druhu a ci je cislo
                  if(!showDetails){
                    if(allConnections.length > numericValue-1){  //v pripade suhrneho zobrazenia prepnutie na zobrazenie detailov
                      toShowDetails(numericValue-1);
                    }else{
                      console.log("Not such number of connection.")
                    }
                     
                  }else{                                          //inak prepnutie na zobrazenie detailov ineho subspojenia
                    if(allConnections[detailsConnectionNumber].length > numericValue){
                      changeDetailsSubconnectionNumber(numericValue);
                    }else{
                      console.log("Not such number of subconnection.")
                    }
                  }
                }
              });
              break;
            case "back_to_previous_page":
              onReactedToOpenLabMessage();
              toSummary();
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
      fetch('https://infinite-eyrie-03685.herokuapp.com/cp/con' + location.search)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(responseJSON => {
              console.log(responseJSON);
              setAllConnections(responseJSON.allConnections);
              if(responseJSON.error !== "No results error"){
                setError(false);
              }else{
                console.log("nastavujetruu");
                setError(true);
              }
          })
          .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
          });
    }, [location.search]);

    const toShowDetails = function (number) {
      setDetailsConnectionNumber(number);
      setShowDetails(true);
    }

    const toSummary = function (event){
      if(event){
        event.preventDefault();
      }
      setShowDetails(false);
    }

    const changeDetailsSubconnectionNumber = function(number){
      setDetailsSubconnectionNumber(number);
    }
  
    return (
      <div className="ConnectionResultsPage">
        {showDetails === false &&(
          <div className="ResultsPageFlexContainer">
            <div className="ResultsLeftBox"><ConResultsSetParams departuresTitle={title} urlPart={location.search} openLabMessage={openLabMessage} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/></div>
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
              <div className="ResultsRightBox"><ConResultsContainer allConnections={allConnections} toShowDetails={toShowDetails}/></div>
            )}
          </div>
        )}
        {showDetails === true &&(
          <div className="ConnectionDetailsFlexContainer">
            <ConnectionDetailsSummary connectionInfo={allConnections[detailsConnectionNumber]} toSummary={toSummary} changeDetailsConnectionNumber={changeDetailsSubconnectionNumber}/>
            <ConnectionDetailsSubconnection connectionInfo={allConnections[detailsConnectionNumber]} connectionNumber={detailsSubconnectionNumber}/>
          </div>
        )}  
      </div>
    );
  }
  
  export default ConnectionResultsPage;