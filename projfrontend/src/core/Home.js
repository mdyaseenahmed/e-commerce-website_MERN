import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
     const [products, setProducts] = useState([]);
     const [error, setError] = useState(false);

     const loadALlProducts = () => {
          getProducts().then((data) => {
               if (data.error) {
                    setError(data.error);
               } else {
                    setProducts(data);
               }
          });
     };

     useEffect(() => {
          loadALlProducts();
     }, []);

     return (
          <Base title="Home Page" description="Welcome to the Tshirt Store">
               <div className="row text-center">
                    <h1
                         className={
                              products.length
                                   ? "text-white py-4"
                                   : "text-center text-white py-4 m-auto"
                         }
                    >
                         {products.length ? "" : "No Product Found.!"}
                    </h1>
                    <div className="row">
                         {products.map((product, index) => {
                              return (
                                   <div key={index} className="col-4 mb-4">
                                        <Card product={product} />
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </Base>
     );
}
