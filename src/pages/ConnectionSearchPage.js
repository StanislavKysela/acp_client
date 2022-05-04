import { Link, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import StationFormComponent from '../components/formsComponents/StationFormComponent';
import TimeFormComponent from '../components/formsComponents/TimeFormComponent';
import DateFormComponent from '../components/formsComponents/DateFormComponent';
import DeparturesRatioFormComponent from '../components/formsComponents/DeparturesRatioFormComponent';
import VehicleFormComponent from '../components/formsComponents/VehicleFormComponent';
import ToHomeButton from '../components/RedirectButtonsComponents/ToHomeButton';
import ToSearchDeparturesButton from '../components/RedirectButtonsComponents/ToSearchDeparturesButton';
import ToSearchLineButton from '../components/RedirectButtonsComponents/ToSearchLineButton';
import CheckboxComponent from '../components/formsComponents/CheckboxFormComponent';
import MaxTransportsFormComponent from '../components/formsComponents/MaxTransportsFormComponent';
import { getDateIfIsCorrect, getNumberOfTransfersIfIsCorrect, getTimeIfIsCorrect, getVehicleTypeIfIsCorrect } from '../functions/correctionOfParameters';

function ConnectionSearchPage(props) {
  const history = useHistory();

  const getTime = function () {
    const date = new Date();
    let minutes = date.getMinutes();
    if(minutes<10){
      minutes = "0" + minutes;
    }
    return(date.getHours() + ":" + minutes);
  };

  const [vehicle, setVehicle] = useState("vlakbusmhd");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [viaStation, setViaStation] = useState("");
  const [directChecked, setDirectChecked] = useState(false);
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(new Date().toLocaleDateString().replace(/\s+/g, ''));
  const [transports, setTransports] = useState("");

  const [mandatoryFilled, setMandatoryFilled] = useState(true);

  useEffect(function(){
    if(props.openLabMessage){
      try{
        switch (props.openLabMessage.intents[0].name) {
          case "to_home":
            props.onReactedToOpenLabMessage();
            history.push("/");
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
          case "via":
            setViaStation(entityElement.value);
            break;
          case "destination":
            setToStation(entityElement.value);
            break;
          default:
            console.log("Location entity role can not be handle at this page!");
        }
        break;
      case "time":
        let timeToSet = getTimeIfIsCorrect(entityElement.value, entityElement.value.length);
        if(timeToSet !== ""){
          setTime(timeToSet);
        }
        break;
      case "date":
        let dateToSet = getDateIfIsCorrect(entityElement.value);
        if(dateToSet !== ""){
          setDate(dateToSet);
        }
        break;
      case "transfers_number":
        let transfersToSet = getNumberOfTransfersIfIsCorrect(entityElement.value);
        if(transfersToSet !== ""){
          setTransports(transfersToSet);
        }
        break;
      case "direct_connection":
        if(entityElement.value === "true"){
          setDirectChecked(true);
          console.log("nastavuje priame");
        }else if(entityElement.value === "false"){
          setDirectChecked(false);
          console.log("nastavuje nepriame");
        }
        break;
      case "vehicle_type":
        if(entityElement.role === "vehicle_type"){
          let vehicleTypeToSet = getVehicleTypeIfIsCorrect(entityElement.value);
          if(vehicleTypeToSet !== ""){
            setVehicle(vehicleTypeToSet);
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
    if(vehicle === "" || fromStation === "" || toStation === ""){
      setMandatoryFilled(false);
    }else{
      let urlPart = "vehicle=" + vehicle + "&from=" + fromStation + "&to=" + toStation;
      if(viaStation !== ""){
        urlPart = urlPart + "&via=" + viaStation;
      }
      if(directChecked){
        urlPart = urlPart + "&dir=true";
      }
      if(time !== ""){
        urlPart = urlPart + "&time=" + time;
      }
      if(date !== ""){
        urlPart = urlPart + "&date=" + date;
      }
      if(transports !== ""){
        urlPart = urlPart + "&maxTran=" + transports;
      }
      console.log("/conRes?" + urlPart);
      history.push("/conRes?" + urlPart);
    }
  };

  const handleChange = function (event) {
    switch (event.target.name) {
      case "vehicleInput":
        setVehicle(event.target.value);
        break;
      case "fromStationInput":
        setFromStation(event.target.value);
        break;
      case "toStationInput":
        setToStation(event.target.value);
        break;
      case "viaStationInput":
        setViaStation(event.target.value);
        break;
      case "checkInput":
        if(directChecked){
          setDirectChecked(false);
        }else{
          setDirectChecked(true);
        }
        break;
      case "timeInput":
        setTime(event.target.value);
        break;
      case "dateInput":
        setDate(event.target.value);
        break;
      case "transportsInput":
        setTransports(event.target.value);
        break;
      default:
        console.log("Element not found while changing states in form.")
    }
    console.log("menene: " + event.target.value);
  };

  return (
    <div className="DeparturesSearch">
        <div className="SearchPageHeader">
          <div className="SearchPageHeaderBox">
            <h1>Vyhľadávanie spojov</h1>
          </div>
          <div className="SearchPageHeaderBox">
            <ToHomeButton doRedirect={"false"}/>
            <ToSearchDeparturesButton doRedirect={"false"}/>
            <ToSearchLineButton doRedirect={"false"}/>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="SearchPageForm">
          <div className="SearchPageFormLeftBox">
            <VehicleFormComponent value={vehicle} type={"vehicle"} handleChange={handleChange}/>
            <StationFormComponent value={fromStation} type={"from"} handleChange={handleChange} resForm={false} mandatory={true}/>
            <StationFormComponent value={toStation} type={"to"} handleChange={handleChange} resForm={false} mandatory={true}/>
            <StationFormComponent value={viaStation} type={"via"} handleChange={handleChange} resForm={false} mandatory={false}/>
          </div>
          <div className="SearchPageFormRightBox">
            <TimeFormComponent value={time} handleChange={handleChange} resForm={false}/>
            <DateFormComponent value={date} handleChange={handleChange} resForm={false}/>
            <MaxTransportsFormComponent value={transports} handleChange={handleChange}/>
            <CheckboxComponent value={directChecked} handleChange={handleChange} title={"priame spojenie"}/>
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
  
  export default ConnectionSearchPage;