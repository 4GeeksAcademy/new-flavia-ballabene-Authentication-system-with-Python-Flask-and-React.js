const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: null,
            user: null,
            logged: false
        },
        actions: {
            signup: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch("https://friendly-giggle-wr7vvpq9vrqr2gw9v-3001.app.github.dev/api/signup", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: dataEmail,
                            password: dataPassword,
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({
                            user: {
                                email: dataEmail,
                                password: dataPassword,
                                id: data.user.id
                            },
                            logged: true
                        });
                        getActions().login(dataEmail, dataPassword);
                        return true;
                    } else {
                        // Check for specific error messages
                        const errorData = await response.json();
                        if (errorData.message) {
                            console.error(`Signup error: ${errorData.message}`);
                        } else {
                            console.error("An error occurred during user creation");
                        }
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user creation", error);
                    return false;
                }
            },
            login: async (dataEmail, dataPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "*"
                        },
                        body: JSON.stringify({
                            email: dataEmail,
                            password: dataPassword
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({
                            user: data.user,
                            token: data.token,
                            logged: true
                        });
                        sessionStorage.setItem("token", data.token);
                        sessionStorage.setItem("userID", data.user.id);
                        window.location = '/private';
                        return true;
                    } else {
                        console.error("An error occurred during user login");
                        return false;
                    }
                } catch (error) {
                    console.error("An error occurred during user login", error);
                    return false;
                }
            },
            verifyAuthToken: async () => {
                const token = sessionStorage.getItem("token");
				console.log(token);
                if (!token) {
                    setStore({ logged: false });
                    window.location = '/login';
                    return false;
                }

                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/protected", {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "*"
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setStore({
                            user: userData.response.user,
                            token: token,
                            logged: true
                        });
                    } else {
                        sessionStorage.removeItem("token");
                        setStore({ logged: false });
						window.location = '/login';
                    }
                } catch (error) {
                    console.error("Token validation failed", error);
                    sessionStorage.removeItem("token");
                    setStore({ logged: false });
					window.location = '/login';
                }
            },
            logout: () => {
                setStore({
                    user: null,
                    token: null,
                    logged: false,
                });
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userID");
            }
        }
    };
};

export default getState;


// const getState = ({ getStore, getActions, setStore }) => {
// 	return {
// 		store: {
// 			token: null,
// 			userData: null,
// 			keys: [],
// 			values: []
// 		},
// 		actions: {
// 			setToken: (token) => {
// 				setStore({token: token})
// 			},
// 			setUserData: (data) => {
// 				setStore({userData: data})
// 			},
// 			addKey: (key) => {
// 				setStore({keys: [...getStore().keys, key]})
// 			},
// 			addValue: (value) => {
// 				setStore({values: [...getStore().values, value]})
// 			},
// 			clearKeys: () => {
// 				setStore({keys: []})
// 			},
// 			clearValues: () => {
// 				setStore({values: []})
// 			},
// 			removeToken: () => {
// 				setStore({token: null})
// 			}
// 		}
// 	};
// };

// export default getState;




// // const getState = ({ getStore, getActions, setStore }) => {
// // 	return {
// // 		store: {
// // 			message: null,
// // 			demo: [
// // 				{
// // 					title: "FIRST",
// // 					background: "white",
// // 					initial: "white"
// // 				},
// // 				{
// // 					title: "SECOND",
// // 					background: "white",
// // 					initial: "white"
// // 				}
// // 			]
// // 		},
// // 		actions: {
// // 			// Use getActions to call a function within a fuction
// // 			exampleFunction: () => {
// // 				getActions().changeColor(0, "green");
// // 			},

// // 			getMessage: async () => {
// // 				try{
// // 					// fetching data from the backend
// // 					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
// // 					const data = await resp.json()
// // 					setStore({ message: data.message })
// // 					// don't forget to return something, that is how the async resolves
// // 					return data;
// // 				}catch(error){
// // 					console.log("Error loading message from backend", error)
// // 				}
// // 			},
// // 			changeColor: (index, color) => {
// // 				//get the store
// // 				const store = getStore();

// // 				//we have to loop the entire demo array to look for the respective index
// // 				//and change its color
// // 				const demo = store.demo.map((elm, i) => {
// // 					if (i === index) elm.background = color;
// // 					return elm;
// // 				});

// // 				//reset the global store
// // 				setStore({ demo: demo });
// // 			}
// // 		}
// // 	};
// // };

// // export default getState;
