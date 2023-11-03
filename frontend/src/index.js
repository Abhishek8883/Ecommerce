import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from './app/store';
import { RouterProvider,createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' >
      <Route  path='/login' element ={<SignIn/>}/>
      <Route  path='/register' element ={<SignUp/>}/>

      <Route path='/' element={<App />}>
        <Route path='' element={<Home />}/>
      </Route>
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
