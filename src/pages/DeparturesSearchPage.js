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
import { getDateIfIsCorrect, getTimeIfIsCorrect, getVehicleTypeIfIsCorrect } from '../functions/correctionOfParameters';

function DeparturesSearchPage(props) {

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
    const [station, setStation] = useState("");
    const [time, setTime] = useState(getTime());
    const [date, setDate] = useState(new Date().toLocaleDateString().replace(/\s+/g, ''));
    const [departures, setDepartures] = useState("departures");

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
            case "search_connections":
              props.onReactedToOpenLabMessage();
              history.push("/conSearch");
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
          //switch(entityElement.role){  //v pripade ze je to entita s lokaciou - zastavkou - kontrolujem jej ucel
            //case "origin":
              setStation(entityElement.value);
              break;
            //default:
              //console.log("Location entity role can not be handle at this page!");
          //}
          //break;
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
        case "departures_arrivals":
          console.log("jetutut");
          if(entityElement.value === "departures"){
            setDepartures("departures");
          }else if(entityElement.value === "arrivals"){
            setDepartures("arrivals");
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
      if(vehicle === "" || station === ""){
        setMandatoryFilled(false);
      }else{
        let urlPart = "vehicle=" + vehicle + "&from=" + station;
        if(time !== ""){
          urlPart = urlPart + "&time=" + time;
        }
        if(date !== ""){
          urlPart = urlPart + "&date=" + date;
        }
        if(departures !== "departures"){
          urlPart = urlPart + "&arr=true";
        }
        console.log("/depRes?" + urlPart);
        history.push("/depRes?" + urlPart);
      }
    };

    const handleChange = function (event) {
      switch (event.target.name) {
        case "vehicleInput":
          setVehicle(event.target.value);
          break;
        case "fromStationInput":
          setStation(event.target.value);
          break;
        case "timeInput":
          setTime(event.target.value);
          break;
        case "dateInput":
          setDate(event.target.value);
          break;
        case "departuresRatio":
            if(event.target.value === "Departures"){
              setDepartures("departures");
            }else{
              setDepartures("arrivals");
            }
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
              <h1>Vyhľadávanie odchodov / príchodov zo zastávky</h1>
            </div>
            <div className="SearchPageHeaderBox">
              <ToHomeButton doRedirect={"false"}/>
              <ToSearchConnectionsButton doRedirect={"false"}/>
              <ToSearchLineButton doRedirect={"false"}/>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="SearchPageForm">
            <div className="SearchPageFormLeftBox">
              <VehicleFormComponent value={vehicle} type={"vehicle"} handleChange={handleChange}/>
              <StationFormComponent value={station} type={"from"} handleChange={handleChange} resForm={false} mandatory={true}/>
              <DeparturesRatioFormComponent value={departures} handleChange={handleChange}/>
            </div>
            <div className="SearchPageFormRightBox">
              <TimeFormComponent value={time} handleChange={handleChange} resForm={false}/>
              <DateFormComponent value={date} handleChange={handleChange} resForm={false}/>
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
  
  export default DeparturesSearchPage;