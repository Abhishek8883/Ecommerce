import * as React from 'react';
import Webfont from "webfontloader";
import {Outlet } from 'react-router-dom';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/footer"

function App() {

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <>
     <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
