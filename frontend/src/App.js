import * as React from 'react';
import Webfont from "webfontloader";
import { removeCredentials, setCredentials } from "./features/user/userSlice";
import { useDispatch } from "react-redux"
import { getCookie, removeCookie } from './utils/Cookie';
import { AUTH_COOKIE } from './constants/Constants';
import { useLazyGetUserDetailsQuery } from './features/user/userApiSlice';
import { useLazyGetTotalCartItemsNoQuery } from "./features/cart/cartApiSlice";
import { setTotalItems } from "./features/cart/cartSlice";
import { getShippingInfo } from "./features/order/shippingSlice";
import { useLazyGetStripeApiKeyQuery } from "./features/order/shippingApiSlice";
import { setStripeApiKey } from './features/user/userSlice';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from "./components/layout/Outlet";
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
import ProtectedRoute from "./utils/ProtectedRoute";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";





export const router = createBrowserRouter(
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
);



function App() {
  const dispatch = useDispatch();
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getTotalCartItems] = useLazyGetTotalCartItemsNoQuery();
  const [getStripeApiKey] = useLazyGetStripeApiKeyQuery();

  async function getApiKey() {
    const result = await getStripeApiKey().unwrap()
    dispatch(setStripeApiKey(result.data.stripeApiKey))
  }

  React.useEffect(() => {
    (async () => {

      //loading fonts
      Webfont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"]
        }
      })


      try {
        getApiKey()
        //gettting user details after state is reset if cookie exist
        const token = getCookie(AUTH_COOKIE);
        dispatch(getShippingInfo());

        if (token) {
          dispatch(setCredentials({
            user: null, accessToken: token, isAuthenticated: false
          }));

          const userData = await getUserDetails().unwrap();

          if (userData.success) {
            dispatch(setCredentials({
              user: userData.data, accessToken: token, isAuthenticated: true
            }))
          }

          const totalItems = await getTotalCartItems().unwrap();
          if (totalItems.success) {
            dispatch(setTotalItems(totalItems.data.totalItems))
          }

        }

      } catch (error) {
        if (error.status === 401) {
          removeCookie(AUTH_COOKIE)
        }
        dispatch(removeCredentials())
      }
    })()

  }, [dispatch, getUserDetails, getTotalCartItems])


  return (
    <>
      <Layout />
    </>
  );
}

export default App;
