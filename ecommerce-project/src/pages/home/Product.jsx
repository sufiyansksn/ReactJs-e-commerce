import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";


export function Product({product, loadCart}) {
    const [quantity, setQuantity] = useState(1)  
    
    //Data Mutation.
    //This code sending a request to the backend telling it to this product to the cart with quantity 1.
    const addToCart = async () => {
            await axios.post("/api/cart-items", {
                productId: product.id,
                quantity: quantity
            });
            //After we update the cart we are calling the funtion loadCart();
            //So this means we update the cart in the backend and we get the new cart and update the page without needing to refresh.
            await loadCart(); //loadCart also asyncronas so we use await
            }
    
    const selectQuantity = (event) => {
                // value={quantity} shows the quantity in we page(current state value)
                const quantitySelector = Number(event.target.value);
                setQuantity(quantitySelector);
                console.log(quantitySelector);
            }

    return (
        <div className="product-container">
        <div className="product-image-container">
            <img className="product-image" src={product.image} />
        </div>

        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
            <img
            className="product-rating-stars"
            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
            />
            <div className="product-rating-count link-primary">
            {product.rating.count}
            </div>
        </div>

        <div className="product-price">{formatMoney(product.priceCents)}</div>

        <div className="product-quantity-container">
            {/* When you select a new number, the onChange handler runs and updates the state with the new quantity. */}
            <select
            value={quantity}
            onChange={selectQuantity}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
        </div>

        <button
            className="add-to-cart-button button-primary"
            //Data Mutation.
            //This code sending a request to the backend telling it to this product to the cart with quantity 1.
            onClick={addToCart}
        >
            Add to Cart
        </button>
        </div>
    );
}
