import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Activity from "./components/activity";
import House from "./components/house";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register"

import React from "react";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route exact path={"/"} component={Home}/>
                  <Route path={"/activity"} component={Activity}/>
                  <Route path={"/house"} component={House} />
                  <Route path={"/login"} component={Login} />
                  <Route path={"/register"} component={Register} />
              </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
