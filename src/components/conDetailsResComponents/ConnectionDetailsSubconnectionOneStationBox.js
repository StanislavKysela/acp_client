import { useEffect, useState } from "react";

function ConnectionDetailsSubconnectionOneStationBox( {connectionStation, startStation, finishStation} ) {

    const[onRequest, setOnRequest] = useState("");
    const[platform, setPlatform] = useState("");
    const[boldStation, setBoldStation] = useState(false);

    useEffect(function(){
        let notesArr = connectionStation.notes.split(" ");
        for(let i = 0; i<notesArr.length; i++){
            if(notesArr[i] === "D"){  //kontrola ci nie je zastavka na znamenie
                setOnRequest("Na znamenie");
            }
            if(!isNaN(notesArr[i]) && notesArr[i]!==""){  //kontrola, ci neni v poznamkach nastupiste
                setPlatform(notesArr[i]);
            }
        }

        if(connectionStation.stationName === startStation || connectionStation.stationName === finishStation){
            setBoldStation(true);
        }else{
            setBoldStation(false);
        }

    }, [connectionStation, startStation. finishStation]);

    return (
      <div className="ConnectionDetailsSubconnectionOneStationBox">
          <div className="ConnDetOneStationBox-Time">
            {connectionStation.arrival}  
          </div>
          <div className="ConnDetOneStationBox-Time">
            {connectionStation.departure}  
          </div>
          {boldStation === true && (
              <div className="ConnDetOneStationBox-StationBold">
              {connectionStation.stationName}
              {platform !== "" && (
                  <span className="OneSubconnectionOneDetailBox-Platform">Nástupište: {platform}</span>
              )}
            </div>
          )}
          {boldStation === false && (
              <div className="ConnDetOneStationBox-Station">
              {connectionStation.stationName}
              {platform !== "" && (
                  <span className="OneSubconnectionOneDetailBox-Platform">Nástupište: {platform}</span>
              )}
            </div>
          )}
          <div className="ConnDetOneStationBox-Request">
            {onRequest}
          </div>
          {boldStation === true && (
            <div className="ConnDetOneStationBox-DistanceBold">
                {connectionStation.distance}
            </div>  
          )}
          {boldStation === false && (
            <div className="ConnDetOneStationBox-Distance">
                {connectionStation.distance}
            </div>  
          )}
          
      </div>
    );
  }
  
  export default ConnectionDetailsSubconnectionOneStationBox;