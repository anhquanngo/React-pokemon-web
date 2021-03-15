import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import MyBag from './pages/myBag';


export default function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:name" component={Detail} />
        <Route exact path="/myBag" component={MyBag} />
        {/* <button onClick={() => action()}>button</button>
        <h1>{hello}</h1> */}
      </Switch>
    </BrowserRouter>
  );
}