import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Webfont from "webfontloader";
import * as React from 'react';

import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import Home from "./components/home/Home"


function App() {

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
