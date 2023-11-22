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


function App() {
  const dispatch = useDispatch();
  const [getUserDetails] = useLazyGetUserDetailsQuery();

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
        }

      } catch (error) {
        if (error.status === 401) {
          removeCookie(AUTH_COOKIE)
        }
        dispatch(removeCredentials())
      }
    })()

  }, [dispatch])


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
