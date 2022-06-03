import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import House from "./components/house";
import Login from "./components/login";
import Register from "./components/register"
import List from "./components/list"
import Activity from "./components/activity"

import React from "react";

function App() {

    // 日志打印输出开关 取消注释后禁用所有console.log日志打印
    // console.log = function (){}

  return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route path={"/house"} component={House} />
                  <Route path={"/login"} component={Login} />
                  <Route path={"/register"} component={Register} />
                  <Route exact path={"/"} component={List} />
                  <Route path={"/activity"} component={Activity} />
              </div>
          </BrowserRouter>
      </div>
  );
}

export default App;
