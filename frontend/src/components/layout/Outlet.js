import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/footer';


const layout = () => {
  
    return (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )
}
export default layout