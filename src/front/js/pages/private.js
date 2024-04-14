import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Private = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    return (
        <div className="text-center">
            {store.logged ? (
                <div>
                    <h1>Welcome, {store.user.email}!</h1>
                    <p>This is a protected route.</p>
                </div>
            ) : (
                <div>
                    <h1>Unauthorized</h1>
                    <p>You need to be logged in to access this page.</p>
                </div>
            )}
        </div>
    );
};

export default Private;


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import "../../styles/home.css";

// export const Private = () => {
//     const navigate = useNavigate()
//     const { store, actions } = useContext(Context);

//     useEffect(() => {
//         const asyncFunc = async () => {
//             if(store.token !== null) {
//                 const resp = await fetch('https://friendly-giggle-wr7vvpq9vrqr2gw9v-3001.app.github.dev/api/private', {
//                         method: "GET",
//                         headers: {
//                             "Authorization": 'Bearer ' + store.token
//                         }
//                     })
//                 if (resp.ok) {
//                     if(store.userData === null) {
//                         const resp_json = await resp.json()
//                         await actions.setUserData(resp_json.user)
//                         Object.keys(store.userData).forEach((key) => {
//                             actions.addKey(key)
//                             actions.addValue(store.userData[key])
//                         })
//                     }
//                 }
//                 else {
//                     alert("You must be logged in to see this page.")
//                     navigate('/login')
//                 }
//             }
//             else {
//                 alert("You must be logged in to see this page.")
//                 navigate('/login')
//             }
//         }
//         setTimeout(() => {
//             asyncFunc() }, 500)
//         },[])

//     return (
//         <div className="container mx-auto">
//             <div className="row mx-auto p-5">
//                 <h1>Super secret private user data!</h1>
//             </div>
//             <div className="row mx-auto p-5">
//                 {store.values.length > 0 ? 
//                     store.keys.map((key, ind) => {
//                         return (
//                             <div>
//                                 <p>{`${key}: ${store.values[ind]}`}</p>
//                             </div>
//                         )
//                     })
//                     : ''
//                 }
//             </div>
//         </div>
//     )

// }







// // import React, { useState, useEffect, useContext } from "react";
// // import PropTypes from "prop-types";
// // import { Link, useParams } from "react-router-dom";
// // import { Context } from "../store/appContext";
// // import rigoImageUrl from "../../img/rigo-baby.jpg";

// // export const Single = props => {
// // 	const { store, actions } = useContext(Context);
// // 	const params = useParams();

// // 	return (
// // 		<div className="jumbotron">
// // 			<h1 className="display-4">This will show the demo element: {store.demo[params.theid].title}</h1>
// // 			<img src={rigoImageUrl} />
// // 			<hr className="my-4" />

// // 			<Link to="/">
// // 				<span className="btn btn-primary btn-lg" href="#" role="button">
// // 					Back home
// // 				</span>
// // 			</Link>
// // 		</div>
// // 	);
// // };

// // Single.propTypes = {
// // 	match: PropTypes.object
// // };
