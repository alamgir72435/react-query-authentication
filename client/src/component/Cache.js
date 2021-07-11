import React from "react";
import { useQueries } from "react-query";
import useSecret from "../api/data/useSecret";
const Cache = () => {
	const { fetchSecret } = useSecret();
	useQueries([
		{
			queryKey: "secret-data",
			queryFn: fetchSecret,
			onSuccess: (data) => {
				console.log(data);
			},
		},
	]);

	return <></>;
};

export default Cache;
