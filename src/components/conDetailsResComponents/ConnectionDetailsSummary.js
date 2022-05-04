import ConnectionDetailsSummaryTitle from "./ConnectionDetailsSummaryTitle";

const { default: OneConnectionDetailBox } = require("../conResComponents/OneConnectionDetailBox");

function ConnectionDetailsSummary( {connectionInfo, toSummary, changeDetailsConnectionNumber} ) {

    //console.log(connectionInfo);
  
    return (
      <div className="ConnectionDetailsSummary">
          <h2 className="TitleConnectionDetails">Detaily o spojení</h2>
          <ConnectionDetailsSummaryTitle titleInfo={connectionInfo[0]}/>
          <OneConnectionDetailBox connectionInfo={connectionInfo} changeDetailsConnectionNumber={changeDetailsConnectionNumber} detailsMode={true}/>
          <div className="BackToConnectionsSummaryButtonContainer">
            <button className="RedirectButton" onClick={toSummary}>
                <h3>Naspäť na výpis spojení</h3>
            </button>
          </div>
      </div>
    );
  }
  
  export default ConnectionDetailsSummary;