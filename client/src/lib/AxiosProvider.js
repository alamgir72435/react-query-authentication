import React, { createContext, useMemo, useContext } from "react";
import Axios from "axios";
const AxiosContext = createContext();

export function AxiosProvider({ children }) {
	const axios = useMemo(() => {
		const axios = Axios.create({
			headers: {
				"Content-Type": "application/json",
			},
		});

		axios.interceptors.request.use((config) => {
			// Read token for anywhere, in this case directly from localStorage
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});

		return axios;
	}, []);

	return (
		<AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
	);
}

export function useAxios() {
	return useContext(AxiosContext);
}
