import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from './PaymentSummary'
import { useState, useEffect } from "react";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  
  const [paymentSummary, setPaymentSummary] = useState([null]); // paymentSummary is going to be object. and it is little easier to check if the object is not loaded if we set it to null at the start

  {/*
  useEffect(() => {
    axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary")
      .then((response) => {
        setPaymentSummary(response.data);
    });
  }, []);
  */}


  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
        setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary")
        setPaymentSummary(response.data);
    }
    fetchCheckoutData();

  },[cart]); {/* This is the dependency array. This Dependency array determines when 
             useEffet runs.Right now it is empyt([]) it means useEffect only runs once.
             However whenever we change a value un Dependency array it will re-run the useEffect.
             So we can put the cart inside the dependency array. whenever cart changes it will re runs the useEffect and update the payment summary. */}
  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
