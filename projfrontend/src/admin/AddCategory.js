import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
     const [name, setName] = useState("");
     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);

     const { user, token } = isAuthenticated();

     const goBack = () => (
          <div className="mt-3">
               <Link
                    className="btn btn-sm btn-success mb-3"
                    to="/admin/dashboard"
               >
                    Admin Home
               </Link>
          </div>
     );

     const handleChange = (event) => {
          setError("");
          setName(event.target.value);
     };

     const onSubmit = (event) => {
          event.preventDefault();
          setError("");
          setSuccess(false);

          //  Backend Request Fired.
          createCategory(user._id, token, { name }).then((data) => {
               if (data.error) {
                    setError(data.error);
               } else {
                    setError("");
                    setSuccess(true);
                    setName("");
               }
          });
     };

     const myCategoryForm = () => {
          return (
               <form>
                    <div className="form-group my-2">
                         <p className="lead my-2">Enter the Category</p>
                         <input
                              type="text"
                              className="form-control my-3"
                              autoFocus
                              placeholder="For Ex. Summer"
                              onChange={handleChange}
                              value={name}
                              required="required"
                         />
                         <button
                              onClick={onSubmit}
                              className="btn btn-outline-info"
                         >
                              Add Category
                         </button>
                    </div>
               </form>
          );
     };

     const successMessage = () => {
          if (success) {
               return (
                    <h5 className="text-success">
                         {" "}
                         Category Created Successfully.
                    </h5>
               );
          }
     };

     const warningMessage = () => {
          if (error) {
               return (
                    <h4 className="text-danger"> Failed To Create Category.</h4>
               );
          }
     };

     return (
          <Base
               title="Create a Category Here."
               description="Add a new Category for Tshirts."
               className="container bg-info p-4 rounded"
          >
               <div className="row bg-white mx-0 rounded">
                    <div className="col-md-8 p-3 offset-md-2">
                         {successMessage()}
                         {warningMessage()}
                         {myCategoryForm()}
                         {goBack()}
                    </div>
               </div>
          </Base>
     );
};

export default AddCategory;
