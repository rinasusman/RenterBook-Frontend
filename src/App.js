import React from 'react';
import Home from './pages/Clients/Home';
import LoginForm from './pages/Admin/LoginForm';
import AdminHome from './pages/Admin/AdminHome'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserForm from './pages/Admin/UserForm';
import CategoryList from './pages/Admin/CategoryList';
import Property from './pages/Clients/Property';
import HomeVerify from './pages/Admin/HomeVerify';
import HomeVerified from './pages/Admin/HomeVerified';
import SIngleHome from './pages/Clients/SIngleHome';
import Favourite from './pages/Clients/Favourite';
import CheckoutPage from './pages/Clients/CheckoutPage';
import HomeEdit from './pages/Clients/HomeEdit';
import Trips from './pages/Clients/Trips';
import ReservPage from './pages/Clients/ReservPage';
import BookingList from './pages/Admin/BookingList';
import Panel from './pages/Clients/Panel';
import Messages from './pages/Clients/Messages';

function App() {
  const token = localStorage.getItem('admintoken')

  return (
    <>   <ToastContainer />
      <Router>

        <Routes>

          <Route path="/admin" element={<LoginForm />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/myproperties" element={<Property />} />
          <Route exact path="/lsitinfo/:id" element={<SIngleHome />} />
          <Route exact path="/favorites" element={<Favourite />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/homeedit" element={<HomeEdit />} />
          <Route exact path="/mytrips" element={<Trips />} />
          <Route exact path="/myreservation" element={<ReservPage />} />
          <Route exact path="/panelmanage" element={<Panel />} />
          <Route exact path="/messages" element={<Messages />} />

          <Route exact path="/dashboard" element={token ? < AdminHome /> : <Navigate to={'/admin'} />} />
          <Route exact path="/userlist" element={<UserForm />} />
          <Route exact path="/category" element={<CategoryList />} />
          <Route exact path="/homeverification" element={<HomeVerify />} />
          <Route exact path="/homes" element={<HomeVerified />} />
          <Route exact path="/bookings" element={<BookingList />} />
        </Routes>

      </Router>
    </>
  );
}


export default App;
