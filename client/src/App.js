import React from 'react';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

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
