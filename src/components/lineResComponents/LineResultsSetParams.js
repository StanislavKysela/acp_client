import { Link, BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TimeFormComponent from '../formsComponents/TimeFormComponent';
import DateFormComponent from '../formsComponents/DateFormComponent';
import StationFormComponent from '../formsComponents/StationFormComponent';
import ToHomeButton from '../RedirectButtonsComponents/ToHomeButton';
import ToSearchDeparturesButton from '../RedirectButtonsComponents/ToSearchDeparturesButton';
import ToSearchLineButton from '../RedirectButtonsComponents/ToSearchLineButton';
import { getDateIfIsCorrect } from '../../functions/correctionOfParameters';

function LineResultsSetParams( props ) {

  const history = useHistory();

    const getTime = function () {
      const date = new Date();
      let minutes = date.getMinutes();
      if(minutes<10){
        minutes = "0" + minutes;
      }
      return(date.getHours() + ":" + minutes);
    };

    const [city, setCity] = useState("kosice");
    const [line, setLine] = useState("");
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [date, setDate] = useState(new Date().toLocaleDateString().replace(/\s+/g, ''));
    const [wholeChecked, setWholeChecked] = useState(false);

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
        default:
          console.log("Set parameters entity can not be handle at this page!");
      }
    }

    useEffect(function(){
      const queryString = require('query-string');
      const parsed = queryString.parse(props.urlPart);
      //console.log(parsed);
      if(parsed.city){
        setCity(parsed.city); 
      }
      if(parsed.line){
        setLine(parsed.line);  
      }
      if(parsed.from){
        setFromStation(parsed.from);  
      }
      if(parsed.to){
        setToStation(parsed.to);
      }
      if(parsed.date){
        setDate(parsed.date);
      }
      if(parsed.wholeWeek === "true"){
          setWholeChecked(true);
      }
    }, [props.urlPart]);

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
            case "checkInput":
              if(wholeChecked){
                setWholeChecked(false);
              }else{
                setWholeChecked(true);
              }
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
        
        if(city === "" || line === ""){
          setMandatoryFilled(false);
        }else{
          setMandatoryFilled(true);
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
          if(wholeChecked){
            urlPart = urlPart + "&wholeWeek=true";
          }
          console.log("/lineRes?" + urlPart);
          history.push("/lineRes?" + urlPart);
        }
    }

    return (
      <div className="DeparturesResultsSetParams">
          <h2>{props.departuresTitle}</h2>
          <div className="ResultsSetParamsImputsContainer">
            <StationFormComponent value={fromStation} type={"from"} handleChange={handleChange} resForm={true} mandatory={false}/>
            <StationFormComponent value={toStation} type={"to"} handleChange={handleChange} resForm={true} mandatory={false}/>
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
              <ToSearchLineButton doRedirect={"false"}/>
          </div>
      </div>
    );
  }
  
  export default LineResultsSetParams;