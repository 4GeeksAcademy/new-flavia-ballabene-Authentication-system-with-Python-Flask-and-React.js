import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<div className="text-center mt-5 container">
			{ store.token === null ?
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/signup')}>
					Sign up!
				</button>  
			</div> : '' }
			{ store.token === null ?
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/login')}>
					Log in
				</button>
			</div> : '' }
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/private')}>
					User info page
				</button>
			</div>
		</div>
	);
};




// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
// import "../../styles/home.css";

// export const Home = () => {
// 	const { store, actions } = useContext(Context);

// 	return (
// 		<div className="text-center mt-5">
// 			<h1>Hello Rigo!!</h1>
// 			<p>
// 				<img src={rigoImageUrl} />
// 			</p>
// 			<div className="alert alert-info">
// 				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
// 			</div>
// 			<p>
// 				This boilerplate comes with lots of documentation:{" "}
// 				<a href="https://start.4geeksacademy.com/starters/react-flask">
// 					Read documentation
// 				</a>
// 			</p>
// 		</div>
// 	);
// };
