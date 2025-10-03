import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckOutPage.jsx';
import { OrdersPage } from './pages/orders/OrdersPage.jsx';
import { TrackingPage } from './pages/tracking/TrackingPage.jsx';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  {/*
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')  // When the backend receive this query parameter it's gonna add product details to the cart. it's going to expand the cart with product details.
      .then((response) => {
        setCart(response.data);
      });
  },[]);
  */}

  // writing await for waiting to finish the backend request and save the result in a variable.
  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product')  // When the backend receive this query parameter it's gonna add product details to the cart. it's going to expand the cart with product details.
        setCart(response.data);
    }

  useEffect(() => {
    loadCart();
  },[]);
  

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />    {/* or <Route path="/" element={<HomePage />}></Route> */}
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
    </Routes>
  )
}

export default App
