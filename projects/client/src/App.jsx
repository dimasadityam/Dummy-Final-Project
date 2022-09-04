import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { keepLogin } from './Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux'
import LandingPage from './Pages/Users/LandingPage';
import Register from './Pages/Users/Register';
import ForgotPassword from './Pages/Users/ForgotPassword';
import Verification from "./Pages/Users/Verification";
import Cart from "./Pages/Users/Cart";
import Dashboard from "./Pages/Admin/Dashboard";
import NotFoundPage from "./Pages/Users/404";
import EditProfile from "./Pages/Users/EditProfile";
import ResetPassword from "./Pages/Users/ResetPassword";
import ChangePassword from "./Pages/Users/ChangePassword";
import ProductList from "./Pages/Users/ProductList";
import ProductDetail from "./Pages/Users/ProductDetail";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => {
    return {
      token: state.userReducers.token,
      role: state.userReducers.role
    }
  })

  useEffect(() => {
    dispatch(keepLogin());
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div>
      <Routes>
        {
          token ?
            <>
              {
                role == 'admin' ?
                  <>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                  </>
                  :
                  <>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/verification/:token' element={<Verification />} />
                    <Route path='/resetPassword/:token' element={<ResetPassword />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/editProfile' element={<EditProfile />} />
                    <Route path='/changePassword' element={<ChangePassword />} />
                    <Route path='/productList' element={<ProductList />} />
                    <Route path='/productDetail' element={<ProductDetail />} />
                  </>
              }
            </>
            :
            <>
              <Route path='/' element={<LandingPage />} />
              <Route path='/forgot' element={<ForgotPassword />} />
              <Route path='/register' element={<Register />} />
            </>
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
