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
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

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
import Payment from './components/order/Payment';
import ElementsLayout from "./components/layout/ElementsLayout";
import OrderSuccess from './components/order/OrderSuccess';



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

      <Route path="/process/payment" element={<ProtectedRoute> <ElementsLayout />
      </ProtectedRoute>} />

      <Route path="/success" element={<ProtectedRoute> <OrderSuccess />
      </ProtectedRoute>} />




    </Route>
  )
);


function App() {
  const dispatch = useDispatch();
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getTotalCartItems] = useLazyGetTotalCartItemsNoQuery();



  React.useEffect(() => {
    (async () => {

      //loading fonts
      Webfont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"]
        }
      })


      try {
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
