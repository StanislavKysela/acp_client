import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function OneConnectionTitleBox({ titleInfo, toShowDetails }) {

    return (
      <div className="OneConnectionTitleBox">
          <div className="OneConnectionTitleBox-Date">{titleInfo[0].startDate}</div>
          <div className="OneConnectionTitleBox-Time">{titleInfo[0].startTime}</div>
          <div>Trvanie: <b>{titleInfo[0].totalTime}</b></div>
          <div>Vzdialenosť: <b>{titleInfo[0].totalLength}</b></div>
          <button className="RedirectButton" onClick={() => toShowDetails(titleInfo[0].idCon-1)}>
            <h5>Detaily {titleInfo[0].idCon}. spojenia</h5>
          </button>
      </div>
    );
  }

  export default OneConnectionTitleBox;