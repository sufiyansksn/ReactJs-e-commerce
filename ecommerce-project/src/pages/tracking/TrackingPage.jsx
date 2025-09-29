import { Header } from "../../components/Header";
import dayjs from "dayjs";
import { OrderSummary } from "../checkout/OrderSummary";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./TrackingPage.css";

export function TrackingPage({ cart, orderProduct }) {
    const [orderss, setOrders] = useState([]);

    useEffect(() => {
        axios.get("/api/orders?expand=products").then((response) => {
        setOrders(response.data);
        });
    }, []);
    return (
        <>
        <title>Tracking</title>

        <Header cart={cart} />

        <div className="tracking-page">
            {orderss.products.map((orderProducts) => {
                <Fragment key={orderProducts.product.id}>
                <div  className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                    View all orders
                    </a>

                    <div className="delivery-date">
                    Arriving on
                    {dayjs(orderProducts.estimatedDeliveryTimeMs).format("MMMM D")}
                    </div>

                    <div className="product-info">{orderProducts.product.name}</div>

                    <div className="product-info">
                    Quantity: {orderProducts.quantity}
                    </div>

                    <img className="product-image" src={orderProducts.product.image} />

                    <div className="progress-labels-container">
                    <div className="progress-label">Preparing</div>
                    <div className="progress-label current-status">Shipped</div>
                    <div className="progress-label">Delivered</div>
                    </div>

                    <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                    </div>
                </div>;
                </Fragment>
            })}
        </div>
        </>
    );
    }
