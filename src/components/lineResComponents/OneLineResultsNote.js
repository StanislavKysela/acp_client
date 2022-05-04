import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function OneLineResultsNote({ note }) {

    return (
      <div className="OneLineResultsNote">
            {note}
      </div>
    );
  }
  
  export default OneLineResultsNote;