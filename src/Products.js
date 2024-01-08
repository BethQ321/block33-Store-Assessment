import React from 'react';
import { Link } from 'react-router-dom'

const Products = ({ products, cartItems, createLineItem, updateLineItem })=> {
  return (
    <div>
      <h2>Products</h2>
      <h3>Click on a product for more information.</h3>
      <ul className="container">
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (              
              <li key={ product.id }>
                <Link to={`/products/${product.id}`}>
                  <h2>{ product.name }</h2>
                  <h3>Cost: ${ product.price / 100 }</h3>
                  <img className="width" src={ product.image } />
                  <br />
                  {
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  }
                </Link>
              </li>              
              
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
