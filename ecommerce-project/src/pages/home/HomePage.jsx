import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductsGrid.jsx';
import "./HomePage.css";


export function HomePage( {cart, loadCart} ) {
    {/* your code is asking your local server for products. 
        When the server replies, you are just printing the reply details in the console.
        The then means “after this is done”. Here it says: after the server sends back a reply, 
        run this function to handle it (in your case, print it).  */}
    
    {/* fetch('http://localhost:3300/api/products') → your code sends a request to the server to get product data.
        .then((response) => { ... }) → when the server replies, you take that reply.
        response.json() → you change the reply into real data (JSON format).
        .then((data) => { console.log(data) }) → when the data is ready, you print it to the console. */}

    {/* fetch('http://localhost:3000/api/products')
            .then((response) => {  
                return response.json();
            }).then((data) => {
                console.log(data);
            }); 
    */} 
    {/* Whenever the HomePage changes or re-renders it will run this code again.
        instade another request to backend. However we just need this products run once on this page.
        We don't need to load the products over and over again. To make this code once, we put inside useEffect. 
    */}

    const [products, setProducts] = useState([]);  {/* useEffect gives an array with 2 values. the first effect is a name of the data
                                                        2. Updater function This is lets us update the first 
                                                            value and this re-generate the HTML */}

    {/*
    useEffect(() => {
        axios.get('/api/products')
        .then((response) => {
            setProducts(response.data);     // This will save the backend products data into products 
        });

    }, []); // This is called a Dependency array. this lets us control when useEffect runs. 
                if we use an empty arrya([]) that means this code runs only ones after component created */}


    {/*This is same data as before but uses async await. Remember async await inside useEffect we need to 
     create a new function and then run the function other wise it will break the rules of useeffect. */}
    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data)
        }

        getHomeData();
        
    },[])


    return (
        <>
        <title>Ecommerce Project</title>

        <Header cart={cart} />      {/* Remember quantity for the cart in the header. So for the we need to pass the cart into header using a prompt */}

        <div className="home-page">
            <ProductsGrid products={products} loadCart={loadCart} />  {/* we separated products grid into smaller component */}
        </div>
        </>
    );
}
