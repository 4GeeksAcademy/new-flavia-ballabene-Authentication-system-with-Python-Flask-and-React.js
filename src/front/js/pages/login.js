import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        actions.login(email, password);
    };

    return (
        <form className="mx-auto" style={{ width: "40%" }}>
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                    />
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>
            <button  className="btn btn-primary" type="submit" onClick={handleLogin}>
                Login
            </button>
            <Link to="/signup">
                    <button className="btn btn-primary mx-5">Register</button>
            </Link>
        </form>
    );
};

export default Login;


// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import "../../styles/home.css";

// export const Login = () => {
//     const navigate = useNavigate()
// 	const { store, actions } = useContext(Context);
//     const [failedLogin, setFailedLogin] = useState(false)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const username = e.target.elements.inputUsername.value
//         const password = e.target.elements.inputPassword.value
//         const obj = {
//             "username": username,
//             "password": password
//         }

//             const json_obj = JSON.stringify(obj)

//             const resp = await fetch('https://friendly-giggle-wr7vvpq9vrqr2gw9v-3001.app.github.dev/api/login', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: json_obj
//             }
//             )
//             if(resp.ok) {
//                 setFailedLogin(false)
//                 const resp_json = await resp.json()
//                 console.log(resp_json.token)
//                 actions.setToken(resp_json.token)
//                 console.log(store.token)
//                 document.cookie = `token=${resp_json.token}`
//                 navigate('/')
//             }
//             else {
//                 setFailedLogin(true)
//             }
//         }

// 	return (
// 		<div className="mt-5">
//             <form onSubmit={e => {handleSubmit(e)}}>
//                 <div className="container">
//                     <div className="form-group col-lg-6 p-2 mx-auto">
//                         <label htmlFor="inputUsername">Username</label>
//                         <input type="text" className="form-control" id="inputUsername" aria-describedby="username" placeholder="Enter username"/>
//                     </div>
//                     {failedLogin ? 
//                         <div className="alert alert-danger">
//                             "Invalid username or password."
//                         </div> : ''}
//                     <div className="form-group col-lg-6 p-2 mx-auto">
//                         <label htmlFor="inputPassword">Password</label>
//                         <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
//                     </div>
//                     <div className="col-lg-6 p-2 mx-auto">
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </div>
//                 </div>
//             </form>
// 		</div>
// 	);
// };
