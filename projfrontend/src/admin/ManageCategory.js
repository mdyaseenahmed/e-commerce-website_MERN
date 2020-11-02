import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
     const [categories, setCategories] = useState([]);

     const { user, token } = isAuthenticated();

     const preload = () => {
          getCategories().then((data) => {
               if (data.error) {
                    console.log(data.error);
               } else {
                    setCategories(data);
               }
          });
     };

     useEffect(() => {
          preload();
     }, []);

     const deleteThisCategory = (categoryId) => {
          deleteCategory(categoryId, user._id, token).then((data) => {
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
          description="Manage Categories Here.!"
          className="container bg-info p-4"
     >
          <Link className="btn btn-dark" to={`/admin/dashboard`}>
               <span className="">Admin Home</span>
          </Link>
          <div className="row bg-dark mt-4">
               <div className="col-12">
                    <h2
                         className={
                              categories.length
                                   ? "text-white text-center border border-info rounded my-4 p-2"
                                   : "text-white text-center border border-white bg-danger rounded my-4 p-2"
                         }
                         style={{ fontSize: "2rem" }}
                    >
                         {categories.length
                              ? "Total " + categories.length + " Categories"
                              : "No Categories Found.!"}
                    </h2>
                         {categories.map((category, index) => {
                              return (
                                   <div
                                        key={index}
                                        className="row text-center m-2"
                                   >
                                        <div className="col-4">
                                             <h3
                                                  className="text-white"
                                                  key={index}
                                             >
                                                  {category.name}
                                             </h3>
                                        </div>
                                        <div className="col-4">
                                             <Link
                                                  className="btn btn-success"
                                                  to={`/admin/category/update/${category._id}`}
                                             >
                                                  <span className="">
                                                       Update
                                                  </span>
                                             </Link>
                                        </div>
                                        <div className="col-4">
                                             <button
                                                  onClick={() => {
                                                       deleteThisCategory(
                                                            category._id
                                                       );
                                                  }}
                                                  className="btn btn-danger"
                                             >
                                                  Delete
                                             </button>
                                        </div>
                                   </div>
                              );
                         })}
                         <div className="row text-center mb-2 "></div>
                    </div>
               </div>
          </Base>
     );
};

export default ManageCategories;
