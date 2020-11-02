import React from "react";
import Menu from "./Menu";

const Base = ({
     title = "My Title",
     description = "My Description",
     className = "bg-dark text-white p-4",
     children,
}) => (
     <div>
          <Menu />
          <div className="container-fluid">
               <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
               </div>
               <div className={className}>{children}</div>
          </div>
          <footer className="footer lead mt-auto pt-2">
               <div className="container-fluid lead text-white text-center py-3" style={{backgroundColor:'#232629'}}>
                    <h4>If You got any questions, feel free to reach out.!</h4>
                    <button className="btn btn-warning btn-lg rounded">
                         Contact Us
                    </button>
                    <p className="text-center mt-auto py-2">
                         <span className="text-center"> Designed & Developed By <br /></span>
                         <a
                              href="https://mdyaseenahmed.github.io"
                              className="text-white"
                         >
                              Md Yaseen Ahmed
                         </a>
                    </p>
               </div>
          </footer>
     </div>
);

export default Base;
