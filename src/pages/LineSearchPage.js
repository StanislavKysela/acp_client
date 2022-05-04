import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import StationFormComponent from '../components/formsComponents/StationFormComponent';
import TimeFormComponent from '../components/formsComponents/TimeFormComponent';
import DateFormComponent from '../components/formsComponents/DateFormComponent';
import DeparturesRatioFormComponent from '../components/formsComponents/DeparturesRatioFormComponent';
import VehicleFormComponent from '../components/formsComponents/VehicleFormComponent';
import ToHomeButton from '../components/RedirectButtonsComponents/ToHomeButton';
import ToSearchConnectionsButton from '../components/RedirectButtonsComponents/ToSearchConnectionsButton';
import ToSearchLineButton from '../components/RedirectButtonsComponents/ToSearchLineButton';
import ToSearchDeparturesButton from '../components/RedirectButtonsComponents/ToSearchDeparturesButton';
import LineFormComponent from '../components/formsComponents/LineFormComponent';
import CheckboxComponent from '../components/formsComponents/CheckboxFormComponent';
import { getDateIfIsCorrect, getMHDCityIfIsCorrect } from '../functions/correctionOfParameters';

function LineSearchPage(props) {
  const history = useHistory();

  const [city, setCity] = useState("kosice");
  const [line, setLine] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString().replace(/\s+/g, ''));

  const [mandatoryFilled, setMandatoryFilled] = useState(true);

  useEffect(function(){
    if(props.openLabMessage){
      try{
        switch (props.openLabMessage.intents[0].name) {
          case "to_home":
            props.onReactedToOpenLabMessage();
            history.push("/");
            break;
          case "search_connections":
            props.onReactedToOpenLabMessage();
            history.push("/conSearch");
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
            for(let i = 0; i<arrOfEntitiesObjects.length; i++){
              props.openLabMessage.entities[arrOfEntitiesObjects[i]].forEach(element => {  //prechadzanie obsahu entit na zaklade pola s objektami druhov entit
                handleSetParametersEntities(element);
              });
            }
            props.onReactedToOpenLabMessage();
            break;
          default:
            console.log("Intent can not be handle at this page!");
        }

      } catch(err){
        console.log("Error while approaching to wit message: " + err);
      }
    }
  }, [props.openLabMessage]);

  const handleSetParametersEntities = function (entityElement) {
    switch (entityElement.name){  //pozeram aky je to druh entity
      case "wit$location":
        switch(entityElement.role){  //v pripade ze je to entita s lokaciou - zastavkou - kontrolujem jej ucel
          case "origin":
            setFromStation(entityElement.value);
            break;
          case "destination":
            setToStation(entityElement.value);
            break;
          default:
            console.log("Location entity role can not be handle at this page!");
        }
        break;
      case "date":
        let dateToSet = getDateIfIsCorrect(entityElement.value);
        if(dateToSet !== ""){
          setDate(dateToSet);
        }
        break;
      case "line_number":
        setLine(entityElement.value);
      case "vehicle_type":
        if(entityElement.role === "city"){
          let cityToSet = getMHDCityIfIsCorrect(entityElement.value);
          if(cityToSet !== ""){
            setCity(cityToSet);
          }
        }
      default:
        console.log("Set parameters entity can not be handle at this page!");
    }
  }

  const handleSubmit = function (event) {
    if(event){
      event.preventDefault();
    }
      if(city === "" || line === ""){
        setMandatoryFilled(false);
      }else{
        let urlPart = "city=" + city + "&line=" + line;
        if(fromStation !== ""){
          urlPart = urlPart + "&from=" + fromStation;
        }
        if(toStation !== ""){
          urlPart = urlPart + "&to=" + toStation;
        }
        if(date !== ""){
          urlPart = urlPart + "&date=" + date;
        }
        console.log("/lineRes?" + urlPart);
        history.push("/lineRes?" + urlPart);
      }
  };

  const handleChange = function (event) {
    switch (event.target.name) {
      case "vehicleInput":
        setCity(event.target.value);
        break;
      case "lineInput":
        setLine(event.target.value);
        break;
      case "fromStationInput":
        setFromStation(event.target.value);
        break;
      case "toStationInput":
        setToStation(event.target.value);
        break;
      case "dateInput":
        setDate(event.target.value);
        break;
      default:
        console.log("Element not found while changing states in form.")
    }
    console.log("menene: " + event.target.value);
  };

  return (
    <div className="LineSearch">
        <div className="SearchPageHeader">
          <div className="SearchPageHeaderBox">
            <h1>Vyhľadávanie linkových cestovných poriadkov</h1>
          </div>
          <div className="SearchPageHeaderBox">
            <ToHomeButton doRedirect={"false"}/>
            <ToSearchConnectionsButton doRedirect={"false"}/>
            <ToSearchDeparturesButton doRedirect={"false"}/>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="SearchPageForm">
          <div className="SearchPageFormLeftBox">
            <VehicleFormComponent value={city} type={"city"} handleChange={handleChange}/>
            <LineFormComponent value={line} handleChange={handleChange}/>
            <DateFormComponent value={date} handleChange={handleChange} resForm={false}/>
          </div>
          <div className="SearchPageFormRightBox">
            <StationFormComponent value={fromStation} type={"from"} handleChange={handleChange} resForm={false} mandatory={false}/>
            <StationFormComponent value={toStation} type={"to"} handleChange={handleChange} resForm={false} mandatory={false}/>
            <div className="ShowResultsContainer">
              <button className="ShowResultsButton" onClick={handleSubmit} type="submit">
                <h3>Zobraziť výsledky</h3>
              </button>
              {mandatoryFilled === false && (
                <div className="ErrorMandatoryShowResults">
                  Nenastavené povinné parametre!
                </div>
              )}
            </div>
          </div>
        </form>
    </div>
  );
  }
  
  export default LineSearchPage;