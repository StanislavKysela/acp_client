import { Link, BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TimeFormComponent from '../formsComponents/TimeFormComponent';
import DateFormComponent from '../formsComponents/DateFormComponent';
import StationFormComponent from '../formsComponents/StationFormComponent';
import ToHomeButton from '../RedirectButtonsComponents/ToHomeButton';
import ToSearchDeparturesButton from '../RedirectButtonsComponents/ToSearchDeparturesButton';
import ToSearchLineButton from '../RedirectButtonsComponents/ToSearchLineButton';
import ToSearchConnectionsButton from '../RedirectButtonsComponents/ToSearchConnectionsButton';
import { getDateIfIsCorrect, getTimeIfIsCorrect } from '../../functions/correctionOfParameters';

function ConResultsSetParams( props ) {

    const history = useHistory();

    const getTime = function () {
      const date = new Date();
      let minutes = date.getMinutes();
      if(minutes<10){
        minutes = "0" + minutes;
      }
      return(date.getHours() + ":" + minutes);
    };

    const [vehicle, setVehicle] = useState("vlak bus mhd");
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
          switch(entityElement.role){  //v pripade ze je to entita s lokaciou - zastavkou - kontrolujem jej ucel
            case "origin":
              setFromStation(entityElement.value);
              break;
            //case "via":
              //setViaStation(entityElement.value);
              //break;
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
        default:
          console.log("Set parameters entity can not be handle at this page!");
      }
    }

    useEffect(function(){
      const queryString = require('query-string');
      const parsed = queryString.parse(props.urlPart);
      //console.log(parsed);
      if(parsed.vehicle){
        setVehicle(parsed.vehicle); 
      }
      if(parsed.via){
        setViaStation(parsed.via);  
      }
      if(parsed.from){
        setFromStation(parsed.from);  
      }
      if(parsed.to){
        setToStation(parsed.to);
      }
      if(parsed.time){
        setTime(parsed.time);
      }
      if(parsed.date){
        setDate(parsed.date);
      }
      if(parsed.dir === "true"){
        setDirectChecked(true);
      }
      if(parsed.maxTran){
        setTransports(parsed.maxTran);
      }
    }, [props.urlPart]);

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

    const handleSubmit = function (event) {
      if(event){
        event.preventDefault();
      }
        
        if(vehicle === "" || fromStation === "" || toStation === ""){
            setMandatoryFilled(false);
        }else{
            setMandatoryFilled(true);
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
    }

    return (
      <div className="ConResultsSetParams">
          <h2>Vyhľadané spojenia</h2>
          <div className="ResultsSetParamsImputsContainer">
            <StationFormComponent value={fromStation} type={"from"} handleChange={handleChange} resForm={true} mandatory={false}/>
            <StationFormComponent value={toStation} type={"to"} handleChange={handleChange} resForm={true} mandatory={false}/>
            <TimeFormComponent value={time} handleChange={handleChange} resForm={true}/>
            <DateFormComponent value={date} handleChange={handleChange} resForm={true}/>
            
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
              <ToSearchConnectionsButton doRedirect={"false"}/>
          </div>
      </div>
    );
  }
  
  export default ConResultsSetParams;