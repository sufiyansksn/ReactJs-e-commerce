import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

export function DeliveryOptions({cartItem, deliveryOptions}) {
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

                return (
                <div key={deliveryOption.id} className="delivery-option">
                    <input
                    type="radio"
                    checked={
                        deliveryOption.id === cartItem.deliveryOptionId
                    }
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