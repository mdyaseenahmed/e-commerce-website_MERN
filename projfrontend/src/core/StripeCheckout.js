import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
     products,
     setReload = (f) => f,
     reload = undefined,
}) => {
     const [data, setData] = useState({
          loading: false,
          success: false,
          error: "",
          address: "",
     });

     const usertoken = isAuthenticated() && isAuthenticated().token;
     const userId = isAuthenticated() && isAuthenticated().user._id;

     const getFinalPrice = () => {
          let amount = 0;
          products.map((p) => {
               amount = amount + p.price;
          });
          return amount;
     };

     const makePayment = (token) => {
          const body = {
               token,
               products,
          };

          const headers = {
               "Content-Type": "application/json",
          };

          return fetch(`${API}/stripepayment`, {
               method: "POST",
               headers,
               body: JSON.stringify(body),
          })
               .then((response) => {
                    // console.log(response);
                    // Here we can Create Further orders
                    const { status } = response;
                    console.log("STATUS: ", status);
                    const orderData = {
                         products: products,
                         transaction_id: response.transaction_id,
                         amount: response.transaction_amount,
                    };
                    createOrder(userId, usertoken, orderData);
                    cartEmpty(() => {
                         console.log("Did we got a Crash.");
                    });
                    setReload(!reload);
               })
               .catch((err) => console.log(err));
     };

     const showStripeButton = () => {
          return isAuthenticated() ? (
               products.length ? (
                    <StripeCheckoutButton
                         name="Buy Tshirts"
                         stripeKey="pk_test_51HiFEdFnRq5mFmwMLoEMhmjIIbVqpw9jjuM3DK7P6vMtoZW5OU0drYTgMZH0VRRzvQtBaqw4f8M8tbomBgGxWVxb00HSydOuAi"
                         token={makePayment}
                         amount={getFinalPrice() * 100}
                         shippingAddress
                         billingAddress
                    >
                         <button className="btn btn-success">
                              Pay with Stripe
                         </button>
                    </StripeCheckoutButton>
               ) : (
                    ""
               )
          ) : (
               <Link to="/signin">
                    <button className="btn btn-warning">
                         Sign In to Checkout
                    </button>
               </Link>
          );
     };

     return (
          <div>
               <h3 className="text-white">
                    Stripe Checkout {products.length ? getFinalPrice() : ""}
               </h3>
               {showStripeButton()}
          </div>
     );
};

export default StripeCheckout;
