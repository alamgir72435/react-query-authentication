import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAxios } from "./../../lib/AxiosProvider";
import useSecret from "./useSecret";
export default function useAuth() {
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { fetchSecret } = useSecret();
	async function authReqest(info) {
		const { data } = await axios.post("http://localhost:5000/auth", info);
		return data;
	}
	async function checkAuthRequest() {
		const { data } = await axios.get("http://localhost:5000/check-auth");
		return data;
	}

	// Refetch Funcnality
	const { mutate: secretFetchAction } = useMutation(fetchSecret, {
		onSuccess: (data) => {
			queryClient.setQueryData("secret-data", data);
		},
	});

	const { mutate: authenticate, isLoading: authenticating } = useMutation(
		authReqest,
		{
			onSuccess: (data) => {
				const { token } = data;
				localStorage.setItem("token", token);
				queryClient.setQueryData("auth", { ...data, isAuthenticated: true });
				queryClient.invalidateQueries("secret-data");
				console.log("success");
				secretFetchAction();
			},
			onError: (err) => {
				console.log(err?.response.data);
			},
		}
	);

	// Check auth
	const { mutate: checkAuthAction } = useMutation(checkAuthRequest, {
		onSuccess: (data) => {
			queryClient.setQueryData("auth", { ...data, isAuthenticated: true });
			secretFetchAction();
		},
	});

	function logoutAction() {
		localStorage.removeItem("token");
		queryClient.setQueryData("auth", {});
	}

	return {
		authenticate,
		authenticating,
		checkAuthAction,
		logoutAction,
	};
}
