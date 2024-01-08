import React from 'react';

const Products = ({ products, cartItems, createLineItem, updateLineItem })=> {
  return (
    <div>
      <h2>Products</h2>
      <ul className="container">
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                <h2>{ product.name }</h2>
                <h3>Cost: ${ product.price / 100 }</h3>
                <img className="width" src={ product.image } />
                <p>{ product.description }</p>
                <br />
                {
                  cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
