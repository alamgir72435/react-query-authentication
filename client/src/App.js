import React, { useState, useEffect } from "react";
import useAuth from "./api/data/useAuth";
import { useQuery, useQueryClient } from "react-query";
import Cache from "./component/Cache";
function App() {
	const queryClient = useQueryClient();
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const { authenticate, authenticating, checkAuthAction, logoutAction } =
		useAuth();

	const { data: auth } = useQuery("auth");
	const { data: secret } = useQuery("secret-data");

	// console.log(auth, secret);

	useEffect(() => {
		checkAuthAction();
	}, [checkAuthAction]);

	function submit() {
		const { username, password } = state;
		if (username === "" || password === "") {
			console.log("username or password must not be empty !");
		} else {
			authenticate(state);
		}
	}

	console.log(auth?.isAuthenticated);

	return (
		<div className="App">
			<div className="box">
				{auth?.isAuthenticated ? (
					<div>
						<Cache />
						<h1>Loged In</h1>
						{JSON.stringify(secret)}
						<button onClick={logoutAction}>Logout</button>
					</div>
				) : (
					<div>
						<input
							value={state.username}
							onChange={(e) =>
								setState((p) => ({ ...p, username: e.target.value }))
							}
							type="text"
							placeholder="username"
						/>
						<input
							value={state.password}
							onChange={(e) =>
								setState((p) => ({ ...p, password: e.target.value }))
							}
							type="password"
							placeholder="password"
						/>
						<button onClick={submit}>
							{authenticating ? "Processing..." : "Submit"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
