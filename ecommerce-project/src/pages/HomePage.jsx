import { Header } from "../components/Header";
import { products } from "../../starting-code/data/products.js";
import "./HomePage.css";

export function HomePage() {
    {/* your code is asking your local server for products. 
        When the server replies, you are just printing the reply details in the console.
        The then means “after this is done”. Here it says: after the server sends back a reply, 
        run this function to handle it (in your case, print it).  */}
    
    {/* fetch('http://localhost:3300/api/products') → your code sends a request to the server to get product data.
        .then((response) => { ... }) → when the server replies, you take that reply.
        response.json() → you change the reply into real data (JSON format).
        .then((data) => { console.log(data) }) → when the data is ready, you print it to the console. */}

    fetch('http://localhost:3000/api/products')
        .then((response) => {  
            return response.json();
        }).then((data) => {
            console.log(data);
        });

    return (
        <>
        <title>Ecommerce Project</title>

        <Header />

        <div className="home-page">
            <div className="products-grid">
                
            {/* This takes each product from products array and transforms into The give HTML */}  
            {products.map((product) => {     
                return (
                <div key={product.id} className="product-container">
                    <div className="product-image-container">
                    <img
                        className="product-image"
                        src={product.image}
                    />
                    </div>

                    <div className="product-name limit-text-to-2-lines">
                    {product.name}
                    </div>

                    <div className="product-rating-container">
                    <img
                        className="product-rating-stars"
                        src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    />
                    <div className="product-rating-count link-primary">{product.rating.count}</div>
                    </div>

                    <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>

                    <div className="product-quantity-container">
                    <select>
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

                    <button className="add-to-cart-button button-primary">
                    Add to Cart
                    </button>
                </div>
                );
            })}
            </div>
        </div>
        </>
    );
}
