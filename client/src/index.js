import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AxiosProvider } from "./lib/AxiosProvider";

const queryClient = new QueryClient();

ReactDOM.render(
	<AxiosProvider>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</AxiosProvider>,
	document.getElementById("root")
);
