import React, { Component } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'

import Container from "react-bootstrap/Container";
import './styles/main.scss';
import 'react-notifications-component/dist/theme.css'
interface pathUIObj {
  [theme: string] : string[]
}

function App() {
  const location = useLocation();
  let theme: string = "";
  // console.log(location.pathname);

  const customUIPaths: pathUIObj = {
    "darkTheme": ["/signup"]
  }

  if (customUIPaths["darkTheme"].includes(location.pathname)){
    theme += "deep-purple-bg";
  }

  return (
    <Container className={`p-0 m-0 app-body ${theme}`} fluid >
      <ReactNotifications/>
      <Outlet/>
    </Container>
    
   
  );
}

export default App;
