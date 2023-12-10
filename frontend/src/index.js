import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from './app/store';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from "./utils/ProtectedRoute";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useSelector } from 'react-redux';


import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProductDetails from './components/product/ProductDetails';
import Products from "./components/product/Products";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ResetPassword from "./components/user/ResetPassword";
import Cart from './components/cart/Cart';
import Shipping from './components/order/Shipping';
import ConfirmOrder from './components/order/ConfirmOrder';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const defaultTheme = createTheme();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route path='' element={<Home />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetails />} />


      {/* Protected routes */}

      <Route path='/profile'
        element={<ProtectedRoute>  <Profile /> </ProtectedRoute>} />

      <Route path='/profile/update'
        element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />

      <Route path='/password/update' element={<ProtectedRoute> <ResetPassword />  </ProtectedRoute>} />

      <Route path='/cart' element={<ProtectedRoute> <Cart />  </ProtectedRoute>} />

      <Route path='/shipping' element={<ProtectedRoute> <Shipping />  </ProtectedRoute>} />

      <Route path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder />  </ProtectedRoute>} />

      {/* <Elements stripe={}>
        <Route path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder />  </ProtectedRoute>} />
      </Elements> */}

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AlertProvider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </AlertProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
