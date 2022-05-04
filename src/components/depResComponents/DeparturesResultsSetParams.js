import { Link, BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TimeFormComponent from '../formsComponents/TimeFormComponent';
import DateFormComponent from '../formsComponents/DateFormComponent';
import StationFormComponent from '../formsComponents/StationFormComponent';
import ToHomeButton from '../RedirectButtonsComponents/ToHomeButton';
import ToSearchDeparturesButton from '../RedirectButtonsComponents/ToSearchDeparturesButton';
import { getDateIfIsCorrect, getTimeIfIsCorrect } from '../../functions/correctionOfParameters';

function DeparturesResultsSetParams( props ) {

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
            case "show_results":
              props.onReactedToOpenLabMessage();
              handleSubmit()
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
        default:
          console.log("Set parameters entity can not be handle at this page!");
      }
    }

    useEffect(function(){
      const queryString = require('query-string');
      const parsed = queryString.parse(props.urlPart);
      //console.log(parsed);
      if(parsed.from){
        setStation(parsed.from);
      }
      if(parsed.time){
        setTime(parsed.time);
      }
      if(parsed.date){
        setDate(parsed.date);
      }
      if(parsed.arr === "true"){
        setDepartures("arrivals");
      }
    }, [props.urlPart]);

    const handleChange = function (event) {
      switch (event.target.name) {
        case "fromStationInput":
          setStation(event.target.value);
          break;
        case "timeInput":
          setTime(event.target.value);
          break;
        case "dateInput":
          setDate(event.target.value);
          break;
        default:
          console.log("Element not found while changing states in form.")
      }
      console.log("menene: " + event.target.value);
    };

    const handleSubmit = function (event) {
      if(event){
        event.preventDefault();
      }
      
      if(vehicle === "" || station === ""){
        setMandatoryFilled(false);
      }else{
        setMandatoryFilled(true);
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
    }

    return (
      <div className="DeparturesResultsSetParams">
          <h2>{props.departuresTitle}</h2>
          <div className="ResultsSetParamsImputsContainer">
            <TimeFormComponent value={time} handleChange={handleChange} resForm={true}/>
            <DateFormComponent value={date} handleChange={handleChange} resForm={true}/>
            <StationFormComponent value={station} type={"from"} handleChange={handleChange} resForm={true} mandatory={true}/>
            <div className="ShowResultsContainer">
              <button className="ShowResultsResButton" onClick={handleSubmit} type="submit">
                <h3>Zobraziť výsledky</h3>
              </button>
            </div>
            {mandatoryFilled === false && (
              <div className="ErrorMandatoryShowResResults">
                Nenastavené povinné parametre!
              </div>
            )}
          </div>
          <div style={{marginLeft: "4%", marginTop: "15%"}}>
            <ToHomeButton doRedirect={"false"}/>
            <ToSearchDeparturesButton doRedirect={"false"}/>
          </div>
      </div>
    );
  }
  
  export default DeparturesResultsSetParams;