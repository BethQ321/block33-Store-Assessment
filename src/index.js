import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import SingleProduct from './SingleProduct';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/lineItems');
      setLineItems(response.data);
    };
    fetchData();
  }, []);

  const cart = orders.find((order) => {return order.is_cart});
  if(!cart){
    return null;
  }

  const createLineItem = async(product)=> {
    const response = await axios.post('/api/lineItems', {
      order_id: cart.id,
      product_id: product.id
    });
    setLineItems([...lineItems, response.data]);
  };

  const updateLineItem = async(lineItem)=> {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity + 1,
      order_id: cart.id
    });
    setLineItems(lineItems.map( (lineItem) => {
      return lineItem.id == response.data.id ? response.data: lineItem
    }));
  };

  const updateOrder = async(order)=> {
    await axios.put(`/api/orders/${order.id}`, order);
    const response = await axios.get('/api/orders');
    setOrders(response.data);
  };

  const removeFromCart = async(lineItem)=> {
    await axios.delete(`/api/lineItems/${lineItem.id}`);
    setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
  };

  const removeOne = async(lineItem)=> {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity - 1,
      order_id: cart.id
    });
    setLineItems(lineItems.map( (lineItem) => {
      return lineItem.id == response.data.id ? response.data: lineItem
    }));
  };

  const addOne = async(lineItem)=> {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity + 1,
      order_id: cart.id
    });
    setLineItems(lineItems.map( (lineItem) => {
      return lineItem.id == response.data.id ? response.data: lineItem
    }));
  };

  const cartItems = lineItems.filter((lineItem) => {
    return lineItem.order_id === cart.id
  });

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  return (
    <div>
      <nav className='spacing'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products ({ products.length })</Link>
        <Link to='/orders'>Orders ({ orders.filter((order) => {return !order.is_cart}).length })</Link>
        <Link to='/cart'>Cart ({ cartCount })</Link>
      </nav>
      <div>
        <Routes>

          <Route path='/' element={<Homepage />} />

          <Route path='/products' element={
            <Products
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
            />}         
          />

          <Route path='/orders' element={
            <Orders
              orders = { orders }
              products = { products }
              lineItems = { lineItems }
            />}          
          />

          <Route path='/cart' element={
            <Cart
              cart = { cart }
              lineItems = { lineItems }
              products = { products }
              updateOrder = { updateOrder }
              removeFromCart = { removeFromCart }
              removeOne = { removeOne }
              addOne = { addOne }
            />}          
          />

          <Route path='/products/:id' element={
            <SingleProduct
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
            />}         
          />
          
        </Routes>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
