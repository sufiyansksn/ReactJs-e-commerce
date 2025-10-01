{/*
import { Header } from "../../components/Header";
import "./TrackingPage.css";

export function TrackingPage() {
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
*/}

import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        setOrder(response.data);
        };

        fetchTrackingData();
    }, [orderId]);

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });
    return (
        <>
        <title>Tracking</title>

        <Header cart={cart} />

        <div className="tracking-page">
            <div className="order-tracking">
            <a className="back-to-orders-link link-primary" href="/orders">
                View all orders
            </a>

            <div className="delivery-date">Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</div>

            <div className="product-info">
                {orderProduct.product.name}
            </div>

            <div className="product-info">Quantity: {orderProduct.quantity}</div>

            <img
                className="product-image"
                src={orderProduct.product.image}
            />

            <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>
            </div>
        </div>
        </>
    );
}

