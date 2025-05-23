import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/myState";
import "tailwindcss";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import AllProducts from "./pages/allproducts/AllProducts";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
              } />

          <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
              <Dashboard />
          </ProtectedRouteForAdmin>
              } />

          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
              <AddProduct />
          </ProtectedRouteForAdmin>
              } />


            <Route path="updateproduct" element={
          <ProtectedRouteForAdmin>
              <UpdateProduct />
          </ProtectedRouteForAdmin>
              } />
              <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  );
};

export default App;


//user :-

export const ProtectedRoute = ( {children} ) => {
  const user = localStorage.getItem('user');

  if(user){
    return children;
  } else {
    return <Navigate to={'/login'}/>
  }

}


export const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'));

  if(admin.user.email === 'admin@gmail.com'){
    return children
  } else {
    return <Navigate to={'/login'}/>
  }
}