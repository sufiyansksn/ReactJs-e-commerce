import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from "../../utils/money";

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate(); //navigate gives a function. and this function lets us navigate to another page in our app.

    const createOrder = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`);
        await loadCart();
        navigate('/orders'); //navigate is not asyncronus
    };  

    return (
        <div className="payment-summary">
        <div className="payment-summary-title">
            Payment Summary
        </div>

        {/* Generating the paymentSummary Data from the backend */}

            {/* if pyamentSummary loads only we displyas the html data other 
                Otherwise we don't have. if paymentSummary null at the start,
                it's not gonna run rest of the code. */}

        {paymentSummary && (
            <>
            <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">
                {formatMoney(paymentSummary.productCostCents)}
                </div>
            </div>

            <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                {formatMoney(paymentSummary.shippingCostCents)}
                </div>
            </div>

            <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                </div>
            </div>

            <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">
                {formatMoney(paymentSummary.taxCents)}
                </div>
            </div>

            <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                {formatMoney(paymentSummary.totalCostCents)}
                </div>
            </div>

            <button className="place-order-button button-primary"
                onClick={createOrder}
            >
                Place your order
            </button>
            </>
        )}
        </div>
    );
}
