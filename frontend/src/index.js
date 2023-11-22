import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store } from './app/store';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from "./utils/ProtectedRoute";


import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProductDetails from './components/product/ProductDetails';
import Products from "./components/product/Products";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ResetPassword from "./components/user/ResetPassword";


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
      <Route path='/profile'
        element={<ProtectedRoute>  <Profile /> </ProtectedRoute>} />

      <Route path='/profile/update'
        element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />

      <Route path='/password/update' element={<ProtectedRoute> <ResetPassword />  </ProtectedRoute>} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
