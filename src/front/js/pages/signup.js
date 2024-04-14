import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        actions
            .signup(email, password)
            .then((success) => {
                if (!success) {
                    setError('User already exist or is malformed. Please try again.');
                }
            })
            .catch((error) => {
                setError('An error occurred during user creation. Please try again.');
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Signup</h2>
                    <form className="mx-auto" style={{ width: '40%' }}>
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
                        <button type="button" onClick={handleSignup} className="btn btn-primary">
                            Register
                        </button>
                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;














// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import "../../styles/home.css";

// export const Signup = () => {
//     const navigate = useNavigate()
// 	const { store, actions } = useContext(Context);

//     const [failedPassword, setFailedPassword] = useState(false)
//     const [failedEmail,setFailedEmail] = useState(false)
//     const [failedUser, setFailedUser] = useState(false)

//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         const email = e.target.elements.inputEmail.value
//         const username = e.target.elements.inputUsername.value
//         const password = e.target.elements.inputPassword.value
//         const obj = {
//             "email": email,
//             "username": username,
//             "password": password
//         }

//         let number = false
//         let upper = false
//         let lower = false
//         let nonAlphanumeric = false

//         for (let i = 0, len = password.length; i < len; i++) {
//             const code = password.charCodeAt(i);
//             if (code > 47 && code < 58) {
//                 // numeric (0-9)
//                 number = true
//             }
//             else if (code > 64 && code < 91) {
//                 // upper alpha (A-Z)
//                 upper = true
//             }
//             else if (code > 96 && code < 123) { 
//                 // lower alpha (a-z)
//               lower = true
//             }
//             else {
//                 nonAlphanumeric = true
//             }
//         }

//         if (number && upper && lower && nonAlphanumeric && password.length >= 8) {
//             const json_obj = JSON.stringify(obj)

//             const resp = await fetch('https://friendly-giggle-wr7vvpq9vrqr2gw9v-3001.app.github.dev/api/signup', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: json_obj
//             }
//             )
//             if(resp.ok) {
//                 setFailedUser(false)
//                 setFailedEmail(false)
//                 setFailedPassword(false)
//                 console.log(await resp.json())
//                 navigate('/login')
//             }
//             else {
//                 const resp_json = await resp.json()
//                 if(resp_json.msg.includes("Username")) {
//                     setFailedPassword(false)
//                     setFailedUser(true)
//                 }
//                 if(resp_json.msg.includes("Email")) {
//                     setFailedPassword(false)
//                     setFailedEmail(true)
//                 }
//             }
            
//         }
//         else {
//             setFailedPassword(true)
//         }
//     }

// 	return (
// 		<div className="mt-5">
//             <form onSubmit={e => {handleSubmit(e)}}>
//                 <div className="container">
//                     <div className="form-group col-lg-6 p-2 mx-auto">
//                         <label htmlFor="inputEmail">Email address</label>
//                         <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
//                         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                     </div>
//                     {failedEmail ? 
//                         <div className="alert alert-danger">
//                             "Email already in use."
//                         </div> : ''}
//                     <div className="form-group col-lg-6 p-2 mx-auto">
//                         <label htmlFor="inputUsername">Username</label>
//                         <input type="text" className="form-control" id="inputUsername" aria-describedby="username" placeholder="Enter username"/>
//                     </div>
//                     {failedUser ? 
//                         <div className="alert alert-danger">
//                             "Username already in use."
//                         </div> : ''}
//                     <div className="form-group col-lg-6 p-2 mx-auto">
//                         <label htmlFor="inputPassword">Password</label>
//                         <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
//                     </div>
//                     {failedPassword ? 
//                         <div className="alert alert-danger">
//                             "Your password must contain at least one number, one capital letter, one lowercase letter, and one non-alphanumeric character (e.g. @, #, $, !, % etc.), and must be at least 8 characters long."
//                         </div> : ''}
//                     <div className="col-lg-6 p-2 mx-auto">
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </div>
//                 </div>
//             </form>
// 		</div>
// 	);
// };



// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";

// import { Context } from "../store/appContext";

// export const Demo = () => {
// 	const { store, actions } = useContext(Context);

// 	return (
// 		<div className="container">
// 			<ul className="list-group">
// 				{store.demo.map((item, index) => {
// 					return (
// 						<li
// 							key={index}
// 							className="list-group-item d-flex justify-content-between"
// 							style={{ background: item.background }}>
// 							<Link to={"/single/" + index}>
// 								<span>Link to: {item.title}</span>
// 							</Link>
// 							{// Conditional render example
// 							// Check to see if the background is orange, if so, display the message
// 							item.background === "orange" ? (
// 								<p style={{ color: item.initial }}>
// 									Check store/flux.js scroll to the actions to see the code
// 								</p>
// 							) : null}
// 							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
// 								Change Color
// 							</button>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 			<br />
// 			<Link to="/">
// 				<button className="btn btn-primary">Back home</button>
// 			</Link>
// 		</div>
// 	);
// };
