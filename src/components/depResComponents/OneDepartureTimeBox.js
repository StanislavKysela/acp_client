import React, { useState, useEffect } from 'react';

function OneDepartureTimeBox({ departureInfo }) {

    return (
        <div className="DepartureTime">
            {departureInfo.delay === "" && (
                <div className="DepartureTime">
                    <div className="DepartureTimeTitle">{departureInfo.time}</div>
                    <div>{departureInfo.date}</div>
                </div>
            )}
            {departureInfo.delay !== "" && (
                <div>
                    <div className="DepartureTime">
                        <div className="DepartureTimeTitle">{departureInfo.time}</div>
                        <div>{departureInfo.date}</div>
                    </div>
                    <div className="DepartureDelayTitle">{departureInfo.delay}</div>
                </div>
            )}
        </div>
    );
  }
  
  export default OneDepartureTimeBox;