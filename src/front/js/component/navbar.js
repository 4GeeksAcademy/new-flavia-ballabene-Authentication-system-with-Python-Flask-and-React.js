import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {store.logged ? (
                        <button className="btn btn-danger" onClick={actions.logout}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};



// import React, { useContext, } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";

// export const Navbar = () => {
// 	const navigate = useNavigate()
// 	const { store, actions } = useContext(Context);

// 	const signOut = () => {
// 		document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
// 		actions.removeToken()
// 		actions.setUserData({})
// 		actions.clearKeys()
// 		actions.clearValues()
// 		navigate('/')
// 	}

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container d-flex justify-content-between">
// 				<Link to="/" style={{ textDecoration: 'none' }}>
// 					<span className="navbar-brand mb-0 h1">Generic Social Media</span>
// 				</Link>
// 				{ store.token !== null ?
// 				<button className="btn btn-primary" onClick={() => signOut()}>Sign out!</button> : ''
// 				}
// 			</div>
// 		</nav>
// 	);
// };



// import React from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };
