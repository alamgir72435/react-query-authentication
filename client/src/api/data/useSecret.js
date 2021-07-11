import React from "react";
import { useAxios } from "../../lib/AxiosProvider";
function useSecret() {
	const axios = useAxios();
	async function fetchSecret() {
		const { data } = await axios.get("http://localhost:5000/secret");
		return data;
	}
	return {
		fetchSecret,
	};
}

export default useSecret;
