import { Link, BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import HomePageFormComponent from '../components/formsComponents/HomePageFormComponent';
import React, { useState, useEffect } from 'react';
import ToSearchConnectionsButton from '../components/RedirectButtonsComponents/ToSearchConnectionsButton';
import ToSearchDeparturesButton from '../components/RedirectButtonsComponents/ToSearchDeparturesButton';
import ToSearchLineButton from '../components/RedirectButtonsComponents/ToSearchLineButton';
import ToDeparturesFromTukeButton from '../components/RedirectButtonsComponents/ToDeparturesFromTukeButton';

function IndexPage( props ) {

    const history = useHistory();

    const [toStation, setToStation] = useState("");
    const [mandatoryFilled, setMandatoryFilled] = useState(true);

    useEffect(function(){
        if(props.openLabMessage){
          try{
            switch (props.openLabMessage.intents[0].name) {
              case "search_connections":
                props.onReactedToOpenLabMessage();
                let arrOfEntitiesObjectsCon = [];
                Object.keys(props.openLabMessage.entities).forEach((key) => {   //tvorba pola s objektami druhov entit
                  arrOfEntitiesObjectsCon.push(key);
                })
                if(arrOfEntitiesObjectsCon.length === 0){   //v pripade ze tam nie je ziadna entita idem an stranku vyhladavania odchodov
                  history.push("/conSearch");
                }else{  //inak nastavim do toStation lokaciu
                  for(let i = 0; i<arrOfEntitiesObjectsCon.length; i++){
                    props.openLabMessage.entities[arrOfEntitiesObjectsCon[i]].forEach(element => {  //prechadzanie obsahu entit na zaklade pola s objektami druhov entit
                      if(element.name==="wit$location" && element.role === "destination"){
                        setToStation(element.value);
                      }
                    });
                  }
                }
                break;
              case "search_lines":
                props.onReactedToOpenLabMessage();
                history.push("/lineSearch");
                break;
              case "search_departures":
                props.onReactedToOpenLabMessage();
                history.push("/depSearch");
                break;
              case "show_results":
                props.onReactedToOpenLabMessage();
                handleSubmit();
                break;
              case "set_parameters":
                let arrOfEntitiesObjects = [];
                Object.keys(props.openLabMessage.entities).forEach((key) => {   //tvorba pola s objektami druhov entit
                  arrOfEntitiesObjects.push(key);
                })
                let departures = false;
                let station = false;
                let regTUKE = new RegExp(/(?:tuke|technická univerzita|technickej univerzity|technicka univerzita|stuke|ztuke)/i);
                for(let i = 0; i<arrOfEntitiesObjects.length; i++){
                  props.openLabMessage.entities[arrOfEntitiesObjects[i]].forEach(element => {  //prechadzanie obsahu entit na zaklade pola s objektami druhov entit
                    if(element.name==="departures_arrivals" && element.value === "departures"){  //nastavovanie stlacenia tlacidla odchody z tuke
                      departures = true;
                    }
                    if(element.name==="wit$location" && element.role === "origin" && regTUKE.test(element.value)){   //nastavovanie stlacenia tlacidla odchody z tuke
                      station = true;
                    }
                    if(element.name==="wit$location" && element.role === "destination"){  //v pripade ze chcem nastavit do zastavku
                      setToStation(element.value);
                    }
                  });
                }
                props.onReactedToOpenLabMessage();
                if(departures && station){
                  history.push("/depRes?vehicle=vlakbusmhd&from=technicka univerzita");
                }
                break;
              default:
                console.log("Intent can not be handle at this page!");
            }

          } catch(err){
            console.log("Error while approaching to wit message: " + err);
          }
        }
      
    }, [props.openLabMessage]);

    const handleChange = function (event) {
      if(event.target.name === "toStationInput"){
        setToStation(event.target.value);
        console.log("menene: " + event.target.value);
      }
    };

    const handleSubmit = function (event) {
      if(event){
        event.preventDefault();
      }
      if(toStation === ""){
        setMandatoryFilled(false);
      }else{
        setMandatoryFilled(true);
        history.push("/conRes?vehicle=vlakbusmhd&from=technicka univerzita&to=" + toStation );
      }
    };
  
    return (
      <div className="IndexPage">
        <div className="IndexLeftBox">
          <div className="IndexTopLeftBox">
            <h3>Vyhľadávanie spojení z TUKE:</h3>
            <HomePageFormComponent value={toStation} handleChange={handleChange} mandatory={true}/>
          </div>

          <div className="IndexBottomLeftBox">
            <div className="VoiceSuggestionContainer">
              <div className="VoiceSuggestionTitle">Skúste povedať: </div> 
              <div className="VoiceSuggestionText">"Spojenie do OC Optima"</div>
            </div>
            <div className="SearchButtonContainerHomepage">
              {mandatoryFilled === false && (
                <div className="ErrorMandatoryShowResultsHomepage">
                  Nenastavený cieľ!
                </div>
              )}
              <button className="ShowResultsButtonHomepage" onClick={handleSubmit} type="submit">
                <h3>Zobraziť výsledky</h3>
              </button>
            </div>
            <div className="CPInfo">
              <span className="CPInfoText">Informácie o cestovných poriadkoch poskytuje Cestovné poriadky CP.sk</span>
              <span>
                <a href="https://www.inprop.sk/">
                  <img src="https://www.inprop.sk/images/logo.png" 
                    alt="Logo INPROP, s.r.o." 
                    title="INPROP, s.r.o. - spoločnosť pre informatiku, prognózy a 
                    optimalizáciu." 
                    width="50"/>
                </a>
              </span>
            </div>
          </div>
        </div>


        <div className="IndexRightBox">
          <div className="IndexTopRightBox">
            <h4>Najbližšie odchody z TUKE:</h4>
            <div><ToDeparturesFromTukeButton doRedirect={"false"}/></div>
            <h4>Navigácia:</h4>
          </div>
          <div className="IndexBottomRightBox">
            <div><ToSearchLineButton doRedirect={"false"}/></div>
            <div><ToSearchDeparturesButton doRedirect={"false"}/></div>
            <div><ToSearchConnectionsButton doRedirect={"false"}/></div>
          </div>
        </div>
          
      </div>
    );
  }
  
  export default IndexPage;