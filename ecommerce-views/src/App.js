import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CheckOut from "./scenes/checkout/CheckOut";
import Confirmation from "./scenes/checkout/Payment";
import NavBar from "./scenes/global/NavBar";
import { ConfigProvider, notification } from "antd";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import NotFound from "./scenes/notfound/NotFound";
import Profile from "./scenes/user/Profile";
import Register from "./scenes/auth/Register";
import Login from "./scenes/auth/Login";
import jwtDecode from "jwt-decode";
import CreateProduct from "./scenes/product/CreateProduct";
import Search from "./scenes/search/Search";
import Success from "./scenes/result/Success";
import Cancel from "./scenes/result/Cancel";
import ImageUpload from "./scenes/product/ImageUpload";
import UpdateImage from "./scenes/updateImage/UpdateImage";


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname])
  return null;
}

const CheckJwt = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('jwt')) {
    const token = localStorage.getItem('jwt');
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (currentTime > decodedToken.exp) {
      localStorage.removeItem('jwt');
      notification.warning({
        message: 'Session Expired!',
        description: 'Your session has been expired!'
      })
      navigate('/')
    }
  }
  return null;
}



function App() {
  return (
    <div className="app">
      <BrowserRouter basename={'ecommerce'}>
        <CheckJwt />
        <ScrollToTop />
        <ConfigProvider theme={{
          token: {
            fontFamily: ["Cinzel", "sans-serif"]
          }
        }}>
          <NavBar />
          <CartMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            {/* <Route path="checkout/accept" element={<Confirmation />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="createProduct" element={<CreateProduct/>}/>
            <Route path="search" element={<Search/>}/>
            <Route path="checkout/success" element={<Success/>}/>
            <Route path="checkout/cancel" element={<Cancel/>}/>
            <Route path="item/:itemId/updateImage" element={<UpdateImage/>}/>
          </Routes>
          <Footer />
        </ConfigProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
