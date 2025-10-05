import { formatMoney } from "../../utils/money";
import axios from 'axios';
import dayjs from "dayjs";

export function DeliveryOptions({cartItem, deliveryOptions, loadCart}) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>

            {/* Generating Delivery Options Html data from the backend */}

            {deliveryOptions.map((deliveryOption) => {
                let priceString = "FREE Shipping";

                if (deliveryOption.priceCents > 0) {
                priceString = `${formatMoney(
                    deliveryOption.priceCents
                )} - Shipping`;
                }

                const updateDeliveryOptions = async () => {
                    await axios.put(`${import.meta.env.VITE_API_URL}/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id     // we ccan send the deliveryOptionId that we want to update to deliveryOption.id
                    });
                    await loadCart(); //After updating the deliveryOption we are going to update the cart and webpage so we don't want to refresh
                }

                return (
                <div key={deliveryOption.id} className="delivery-option"
                    onClick={updateDeliveryOptions}
                >
                    <input
                    type="radio"
                    checked={
                        deliveryOption.id === cartItem.deliveryOptionId
                    }
                    onChange={() => {}}
                    className="delivery-option-input"
                    name={`delivery-option-${cartItem.productId}`} // name groups the selectors together, So each set of selector should have a unique name. This make sure each product we can only select one of them. that's whhy we use {cartItem.productId} eachs set of selector should belongs to one product
                    />
                    <div>
                    <div className="delivery-option-date">
                        {dayjs(
                        deliveryOption.estimatedDeliveryTimeMs
                        ).format("dddd, MMM, D")}
                    </div>

                    <div className="delivery-option-price">
                        {priceString}
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}
