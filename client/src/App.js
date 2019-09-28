import React from 'react';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Landing} from "./components/home/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
