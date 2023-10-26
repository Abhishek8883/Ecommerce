import './App.css';
import Header from "./components/layout/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import Webfont from "webfontloader";
import * as React from 'react';



function App() {

  React.useEffect(() => {
    Webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])

  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
