import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import PreFooter from './components/footer/PreFooter';
import Homepages from './pages/Homepages';
import NotFound from './pages/Notfound';
import './App.css';
import Login from './pages/LoginRegister';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Sidebar from './components/navbar/VnavBar';
import PromoEventM from './pages/PromoEvent';
import Order from './pages/Order';
import { Row, Col } from 'react-bootstrap';
import Shop from './pages/Shop';
import Thankyou from './pages/Thankyou';
import YourTickets from './pages/YourTickets';
import Theater from './pages/Theater';
import TheaterDetail from './pages/TheaterDetail';
import MoviesAdmin from './pages/Admin/MoviesAdmin';
import AddMovies from './pages/Admin/AddnewMovies';
import UpdateMovie from './pages/Admin/UpdateMovies';
import AdminTheater from './pages/Admin/AdminTheater';
import AddTheater from './pages/Admin/AddNewTheater';
import UsersList from './pages/Admin/AdminUser';
import FoodList from './pages/Admin/AdminFood';
import AddFood from './pages/Admin/AddNewFood';


function App() {

  const role = localStorage.getItem('role');

  return (
    <div className="App">
      <Router>
        {
          role === 'admin' ?
            <>
              <Row>
                <Col md={2}>
                <Sidebar />
                </Col>
                <Col md={10}>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/admin/movies" element={<MoviesAdmin />} />
                    <Route path="/admin/movies/addMovies" element={<AddMovies />} />
                    <Route path="/admin/movies/updateMovies/:id" element={<UpdateMovie />} />
                    <Route path="/admin/theaters" element={<AdminTheater />} />
                    <Route path="/admin/theaters/addTheater" element={<AddTheater />} />
                    <Route path="/admin/users" element={<UsersList />} />
                    <Route path="/admin/foods" element={<FoodList />} />
                    <Route path="/admin/food/add" element={<AddFood />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Col>
              </Row>
            </>
            :
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Homepages />} />
                <Route path="/theater" element={<Theater />} />
                <Route path="/theater/:tid" element={<TheaterDetail />} />
                <Route path="/promo" element={<PromoEventM />} />
                <Route path="/order/:mid" element={<Order />} />
                <Route path="/orderdetails/:pay" element={<Thankyou />} />
                <Route path="/yourtickets" element={<YourTickets />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <PreFooter/>
              <Footer />
            </>
        }
      </Router>
    </div>
  );
}

export default App;
