function ConnectionDetailsSummaryTitle( {titleInfo} ) {

    
  
    return (
      <div className="ConnectionDetailsSummaryTitle">
          <div>Odchod: </div>
          <div className="ConnectionDetailsTimeDateFlexContainer">
            <div className="OneConnectionTitleBox-Time">{titleInfo.startTime}</div>
            <div className="OneConnectionTitleBox-Date">{titleInfo.startDate}</div>
          </div>
          <div>Trvanie: <b>{titleInfo.totalTime}</b></div>
          <div>Vzdialenosť: <b>{titleInfo.totalLength}</b></div>
      </div>
    );
  }
  
  export default ConnectionDetailsSummaryTitle;