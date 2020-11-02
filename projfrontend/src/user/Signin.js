import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper";

const Signin = () => {
     const [values, setValues] = useState({
          email: "m@yaseen.com",
          password: "12345",
          error: false,
          loading: false,
          didRedirect: false,
     });

     const { email, password, error, loading, didRedirect } = values;

     const { user } = isAuthenticated();

     const handleChange = (name) => (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
     };

     const onSubmit = (event) => {
          event.preventDefault();
          setValues({ ...values, error: false, loading: true });
          signin({ email, password })
               .then((data) => {
                    if (data.error) {
                         setValues({
                              ...values,
                              error: data.error,
                              loading: false,
                         });
                    } else {
                         authenticate(data, () => {
                              setValues({ ...values, didRedirect: true });
                         });
                    }
               })
               .catch(console.log("Sign In Request Failed.!"));
     };

     const performRedirect = () => {
          if (didRedirect) {
               if (user && user.role === 1) {
                    return <Redirect to="/admin/dashboard" />;
               } else {
                    return <Redirect to="/user/dashboard" />;
               }
          }
          if (isAuthenticated()) {
               return <Redirect to="/" />;
          }
     };

     const loadingMessage = () => {
          return (
               loading && (
                    <div className="alert alert-info">
                         <h4> Loading... </h4>
                    </div>
               )
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

     const signInForm = () => {
          return (
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                         <form>
                              <div className="form-group">
                                   <label className="text-light">Email</label>
                                   <input
                                        className="form-control"
                                        type="email"
                                        placeholder="user@domain"
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
                                        placeholder="Password"
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

     return (
          <Base title="Sign In Page" description="A Page for User to Sign In.!">
               <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                         {loadingMessage()}
                    </div>
               </div>
               {errorMessage()}
               {signInForm()}
               {performRedirect()}
               <p className="mt-4 text-center text-white">
                    {JSON.stringify(values)}
               </p>
          </Base>
     );
};

export default Signin;
