import * as React from 'react';
import Webfont from "webfontloader";
import {Outlet } from 'react-router-dom';

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
      <Outlet />
    </>
  );
}

export default App;
