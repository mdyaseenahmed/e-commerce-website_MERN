import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { getProducts } from "./helper/coreapicalls";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
     const [products, setProducts] = useState([]);
     const [reload, setReload] = useState(false);

     useEffect(() => {
          setProducts(loadCart());
     }, [reload]);

     const loadAllProducts = () => {
          return (
               <div>
                    <h3>{products.length ? "" : "Your Cart is Empty"}</h3>
                    {products.map((product, index) => {
                         return (
                              <Card
                                   key={index}
                                   product={product}
                                   removeFromCart={true}
                                   AddtoCart={false}
                                   setReload={setReload}
                                   reload={reload}
                              />
                         );
                    })}
               </div>
          );
     };

     const loadCheckout = () => {
          return (
               <div>
                    <h3>Checkout </h3>
               </div>
          );
     };

     return (
          <Base title="Cart Page" description="Ready to CheckOut">
               <div className="row text-center">
                    <div className="col-4">{loadAllProducts()}</div>
                    <div className="col-8">
                         <StripeCheckout
                              products={products}
                              setReload={setReload}
                         />
                    </div>
               </div>
          </Base>
     );
};

export default Cart;
