import * as React from 'react';
import Webfont from "webfontloader";
import { Outlet } from 'react-router-dom';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/footer";
import { removeCredentials, setCredentials } from "./features/user/userSlice";
import { useDispatch } from "react-redux"
import { getCookie, removeCookie } from './utils/Cookie';
import { AUTH_COOKIE } from './constants/Constants';
import { useLazyGetUserDetailsQuery } from './features/user/userApiSlice';
import {useLazyGetTotalCartItemsNoQuery} from "./features/cart/cartApiSlice";
import {setTotalItems} from "./features/cart/cartSlice";
import  {getShippingInfo} from "./features/order/shippingSlice";
import {useLazyGetStripeApiKeyQuery} from "./features/order/shippingApiSlice";
import { setStripeApiKey } from './features/user/userSlice';



function App() {
  const dispatch = useDispatch();
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getTotalCartItems] = useLazyGetTotalCartItemsNoQuery();
  const [getStripeApiKey] = useLazyGetStripeApiKeyQuery();

  async function getApiKey(){
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
          if(totalItems.success){
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

  }, [dispatch,getUserDetails,getTotalCartItems])


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
