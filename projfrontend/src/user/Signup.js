import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
     const [values, setValues] = useState({
          name: "",
          email: "",
          password: "",
          error: "",
          success: false,
     });

     const { name, email, password, error, success } = values;

     const handleChange = (name) => (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
     };

     const onSubmit = (event) => {
          event.preventDefault();
          setValues({ ...values, error: false });
          signup({ name, email, password })
               .then((data) => {
                    if (data.error) {
                         setValues({
                              ...values,
                              error: data.error,
                              success: false,
                         });
                    } else {
                         setValues({
                              ...values,
                              name: "",
                              email: "",
                              password: "",
                              error: "",
                              success: true,
                         });
                    }
               })
               .catch(console.log("Error in SignUp"));
     };

     const signUpForm = () => {
          return (
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                         <form>
                              <div className="form-group">
                                   <label className="text-light">Name</label>
                                   <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Your Name"
                                        onChange={handleChange("name")}
                                        value={name}
                                   />
                              </div>
                              <div className="form-group">
                                   <label className="text-light">Email</label>
                                   <input
                                        className="form-control"
                                        type="email"
                                        placeholder="example@domain"
                                        onChange={handleChange("email")}
                                        value={email}
                                   />
                              </div>
                              <div className="form-group">
                                   <label className="text-light">
                                        Password
                                   </label>
                                   <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={handleChange("password")}
                                        value={password}
                                   />
                              </div>
                              <button
                                   className="btn btn-success btn-block"
                                   onClick={onSubmit}
                              >
                                   Submit
                              </button>
                         </form>
                    </div>
               </div>
          );
     };

     const successMessage = () => {
          return (
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                         <div
                              className="alert alert-success"
                              style={{ display: success ? "" : "none" }}
                         >
                              New Account was Created Successfully. Please{" "}
                              <Link to="/signin">Login Here</Link>
                         </div>
                    </div>
               </div>
          );
     };

     const errorMessage = () => {
          return (
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                         <div
                              className="alert alert-danger"
                              style={{ display: error ? "" : "none" }}
                         >
                              {error}
                         </div>
                    </div>
               </div>
          );
     };

     return (
          <div>
               <Base
                    title="Sign Up Page"
                    description="A Page for User to Sign Up.!"
               >
                    {successMessage()}
                    {errorMessage()}
                    {signUpForm()}
                    <p className="text-center text-white">
                         {JSON.stringify(values)}
                    </p>
               </Base>
          </div>
     );
};

export default Signup;
