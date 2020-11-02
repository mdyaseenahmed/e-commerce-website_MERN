import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategories = ({ match }) => {
     const [name, setName] = useState("");
     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);

     useEffect(() => {
          preload(match.params.categoryId);
     }, []);

     const preload = (categoryId) => {
          getCategory(categoryId).then((data) => {
               console.log(data);
               if (data.error) {
                    setError("");
               } else {
                    setName(data.name);
               }
          });
     };

     const goBack = () => (
          <div className="mt-3">
               <Link
                    className="btn btn-sm btn-dark mb-3"
                    to="/admin/categories"
               >
                    Manage Categories
               </Link>
          </div>
     );

     const { user, token } = isAuthenticated();

     const handleChange = (event) => {
          setError("");
          setName(event.target.value);
     };

     const onSubmit = (event) => {
          event.preventDefault();
          setError("");
          setSuccess(false);

          //  Backend Request Fired.
          updateCategory(match.params.categoryId, user._id, token, {
               name,
          }).then((data) => {
               if (data.error) {
                    setError(true);
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
                              required
                         />
                         <button
                              onClick={onSubmit}
                              className="btn btn-outline-info"
                         >
                              Update Category
                         </button>
                    </div>
               </form>
          );
     };

     const successMessage = () => {
          if (success) {
               return (
                    <h5 className="text-success">
                         Category Updated Successfully.
                    </h5>
               );
          }
     };

     const warningMessage = () => {
          if (error) {
               return (
                    <h4 className="text-danger"> Failed To Update Category.</h4>
               );
          }
     };

     return (
          <Base
               title="Update the Category Here."
               description="Update the Category of Tshirts."
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

export default UpdateCategories;
