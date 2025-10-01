import { Product } from './Product'

export function ProductsGrid({ products, loadCart }) {

    return (
        <div className="products-grid">
                
            {/* This takes each product from products array and transforms into The give HTML */}  
            {products.map((product) => {    

                return (
                    <Product key={product.id} product={product} loadCart={loadCart} />
                );
            })}
            </div>
    );
}