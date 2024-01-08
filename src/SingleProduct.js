import React from 'react';
import { Link, useParams } from 'react-router-dom'

const SingleProduct = ({products, cartItems, createLineItem, updateLineItem}) => {

    const params = useParams()
    const id = params.id

    const oneProduct = products.find((product) => {
        return product.id === id
    })

    const cartItem = cartItems.find(lineItem => lineItem.product_id === oneProduct.id);

    if(!oneProduct) {
        return null
    } else {
        return(
            <div>
                <h1>{ oneProduct.name }</h1>
                <h3>Cost: ${ oneProduct.price / 100 }</h3>
                <img className="width" src={ oneProduct.image } />
                <p>{ oneProduct.description }</p>
                <br />
                {
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another to Cart</button>: <button onClick={ ()=> createLineItem(oneProduct)}>Add</button>
                }
                <br />
                <br />
                <Link to='/products'><button>Back to Products</button></Link>
            </div>
        )
    }
}

export default SingleProduct
