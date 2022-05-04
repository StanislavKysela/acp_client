import React, { useState, useEffect } from 'react';
import ConnectionDetailsSubconnectionOneStationBox from './ConnectionDetailsSubconnectionOneStationBox';
import ConnectionDetailsSubconnectionTableHeader from './ConnectionDetailsSubconnectionTableHeader';

function ConnectionDetailsSubconnection( {connectionInfo, connectionNumber} ) {

  //console.log(connectionInfo);
  //console.log(connectionNumber);

    const [connectionStationsInfo, setConnectionStationsInfo] = useState([]);
    const [lastStationName, setLastStationName] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    useEffect(function(){
        let splitedLink = connectionInfo[connectionNumber].detailsLink.split("&", 1)[0]; //odstranenie parametrov z linku - pretoze be to aj tak ignoruje
        fetch('https://infinite-eyrie-03685.herokuapp.com/cp/cond?url=' + splitedLink)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseJSON => {
                console.log("RESPONSE: ");
                console.log(responseJSON);
                setLastStationName(responseJSON.connectionInfo[responseJSON.connectionInfo.length-1].stationName);
                let startIndex = 0;
                let finishIndex = responseJSON.connectionInfo.length-1;
                for(let i = 0; i<responseJSON.connectionInfo.length; i++){ //zistenie rozsahu zastavok
                  if(responseJSON.connectionInfo[i].stationName===connectionInfo[connectionNumber].startStation){
                    startIndex = i;
                  }
                  if(responseJSON.connectionInfo[i].stationName===connectionInfo[connectionNumber].finishStation){
                    finishIndex = i;
                  }
                }
                setConnectionStationsInfo(responseJSON.connectionInfo.slice(startIndex, finishIndex+1)); //odchody a prichody na stanicu
                setVehicleType(responseJSON.connectionType);  //typ vozidla
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
      }, [connectionNumber]);

    return (
      <div className="ConnectionDetailsSubconnection">
          
        <h2 className="TitleConnectionDetails">Spoj <span className="ConnectionDetailsSubconnection_Name">{connectionInfo[connectionNumber].vehicleName}</span></h2>
        <div className="ConnectionDetailsSubconnection_Owner">Prepravca: {connectionInfo[connectionNumber].vehicleOwner}</div>
        <div className="ConnectionDetailsSubconnection_LastStation">Smer: {lastStationName}</div>

        <ConnectionDetailsSubconnectionTableHeader/>
        <div>{connectionStationsInfo.map((connectionStation, i) => <ConnectionDetailsSubconnectionOneStationBox 
          connectionStation={connectionStation} 
          key={i}
          startStation={connectionInfo[connectionNumber].startStation}
          finishStation={connectionInfo[connectionNumber].finishStation}
        />)}</div>  

      </div>
    );
  }
  
  export default ConnectionDetailsSubconnection;