import dayjs from "dayjs";
import axios from 'axios';
import { formatMoney } from '../../utils/money.js'
import { DeliveryOptions } from './DeliveryOptions.jsx'

export function OrderSummary({cart, deliveryOptions, loadCart}) {
    return (
        <div className="order-summary">
        {/* Generate the cart-items Html data from the backend */}

        {deliveryOptions.length > 0 &&
            cart.map((cartItem) => {
            // deliveryOptions start out as empty , if they are empty we may not find the selected options. to fix thsi we use deliveryOptions.length > 0 .
            const selectDeliveryOptions = deliveryOptions.find(
                (deliveryOption) => {
                // in this inner function this recevies each delivery option.
                return deliveryOption.id === cartItem.deliveryOptionId; //So the delivery Option matches with what inside the cartitem will return True and that's gonna be save in selectDeliveryOptions.
                }
            );

            const deleteCatrItem = async () => {
                await axios.delete(`/api/cart-items/${cartItem.productId}`);
                await loadCart();
            }

            return (
                <div key={cartItem.productId} className="cart-item-container">
                <div className="delivery-date">
                    Delivery date:{" "}
                    {dayjs(selectDeliveryOptions.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM, D"
                    )}
                </div>

                <div className="cart-item-details-grid">
                    <img className="product-image" src={cartItem.product.image} />

                    <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>

                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>

                    <div className="product-quantity">
                        <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                            {cartItem.quantity}
                        </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                        Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={deleteCatrItem}
                        >
                        Delete
                        </span>
                    </div>
                    </div>

                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                </div>
                </div>
            );
            })}
        </div>
    );
}
