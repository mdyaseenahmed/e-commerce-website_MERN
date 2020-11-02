import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getProducts } from "./helper/adminapicall";

const ManageProducts = () => {
     const [products, setproducts] = useState([]);
     const { user, token } = isAuthenticated();

     const preload = () => {
          getProducts().then((data) => {
               if (data.error) {
                    console.log(data.error);
               } else {
                    setproducts(data);
               }
          });
     };

     useEffect(() => {
          preload();
     }, []);

     const deleteThisProduct = (productId) => {
          deleteProduct(productId, user._id, token).then((data) => {
               if (data.error) {
                    console.log(data.error);
               } else {
                    preload();
               }
          });
     };

     return (
          <Base
               title="Welcome Admin"
               description="Manage Products Here."
               className="container bg-info p-4"
          >
               <Link className="btn btn-dark" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
               </Link>
               <div className="row bg-dark mt-4">
                    <div className="col-12">
                         <h2
                              className={
                                   products.length
                                        ? "text-white text-center border border-info rounded my-4 p-2"
                                        : "text-white text-center border border-white bg-danger rounded my-4 p-2"
                              }
                              style={{ fontSize: "2rem" }}
                         >
                              {products.length
                                   ? "Total " + products.length + " Products"
                                   : "No Product Found.!"}
                         </h2>
                         {products.map((product, index) => {
                              return (
                                   <div
                                        key={index}
                                        className="row text-center m-2"
                                   >
                                        <div className="col-4">
                                             <h3 className="text-white text-left">
                                                  {product.name}
                                             </h3>
                                        </div>
                                        <div className="col-4">
                                             <Link
                                                  className="btn btn-success"
                                                  to={`/admin/product/update/${product._id}`}
                                             >
                                                  <span className="text-center">
                                                       Update
                                                  </span>
                                             </Link>
                                        </div>
                                        <div className="col-4">
                                             <button
                                                  onClick={() => {
                                                       deleteThisProduct(
                                                            product._id
                                                       );
                                                  }}
                                                  className="btn btn-danger text-center"
                                             >
                                                  <span className="text-center">
                                                       Delete
                                                  </span>
                                             </button>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </Base>
     );
};

export default ManageProducts;
