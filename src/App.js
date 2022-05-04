import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NoMatchPage from './pages/NoMatchPage';
import DeparturesResultsPage from './pages/DeparturesResultsPage';
import DeparturesSearchPage from './pages/DeparturesSearchPage';
import ConnectionSearchPage from './pages/ConnectionSearchPage';
import LineSearchPage from './pages/LineSearchPage';
import Paho from 'paho-mqtt';
import React, { useState, useEffect } from 'react';
import ConnectionResultsPage from './pages/ConnectionResultsPage';
import LineResultsPage from './pages/LineResultsPage';

function App() {

  //const [ client, setClient ] = React.useState(new Paho.Client("wss://openlab.kpi.fei.tuke.sk", "sk330oq" + new Date().getTime()));
  const [ client, setClient ] = React.useState(new Paho.Client("openlab.kpi.fei.tuke.sk",443, "sk330oq" + new Date().getTime()));
  const [ message, setMessage] = React.useState();
  //new Paho.Client("wss://key:secret@picockpit.local/mqtt“, „clientid“);
  React.useEffect(() => {
    let options = {
      useSSL: true,
      timeout: 3,
      onSuccess: onConnect,
      reconnect: true
    }
		//nastavim ze co sa stane ked stratim spojenie a ked dostanem spravu
		client.onConnectionLost = onConnectionLost;
		client.onMessageArrived = onMessageArrived;
		//tu sa pripojím k danej službe, vyvolám ten connect aby som sa zapísal na odoberanie daného topiku
    client.connect(options);

  },[])

  function onConnect() {
    console.log("onConnect");
    //tu sa pripojim na odoberanie temy, konkretne teplota z dajakeho senzora
      let rerr = client.subscribe("experiments/voice/recognition/sk330oq");
      console.log(client);
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    //console.log(message);
    //console.log("onMessageArrived for topic '" +message.destinationName +"': " + message.payloadString + " ");
    const messageJson = JSON.parse(message.payloadString);
    
    if(messageJson.status === "recognized"){
      console.log(messageJson);
      
        //POSIELANIE SPRAVY NA ROZPOZNANIE DO WIT

      const q = encodeURIComponent(messageJson.recognized);
      const uri = 'https://api.wit.ai/message?v=20210505&q=' + q;
      const auth = 'Bearer GB5ER2DL52FZWE4QNJWV4AQIGGWD2FPM';

      fetch(uri, {headers: {Authorization: auth}})
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseJSON => {
            console.log(responseJSON);
            setMessage(responseJSON);
        })
        .catch(error => {
            console.error('There has been a problem with fetch operation to Wit:', error);
        });
    }
  }

  const onReactedToOpenLabMessage = function (event) {
    setMessage();
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <IndexPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage} />} />
          <Route exact path="/conSearch" render={(props) => <ConnectionSearchPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route exact path="/conRes" render={(props) => <ConnectionResultsPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route exact path="/depSearch" render={(props) => <DeparturesSearchPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route exact path="/depRes" render={(props) => <DeparturesResultsPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route exact path="/lineSearch" render={(props) => <LineSearchPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route exact path="/lineRes" render={(props) => <LineResultsPage {...props} openLabMessage={message} onReactedToOpenLabMessage={onReactedToOpenLabMessage}/>}/>
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
