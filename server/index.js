const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(require("cors")());
app.use(express.json());
app.get("/", (req, res) => {
	res.send("server running");
});

const users = [
	{ id: 1, name: "saif Ahamed", username: "01810506803", password: "ffffff" },
	{ id: 2, name: "Alamgir Ahamed", username: "alamgir", password: "222" },
];

app.post("/auth", (req, res) => {
	const { username, password } = req.body;
	const user = users.find(
		(x) => x.username === username && password === password
	);

	if (user) {
		const token = jwt.sign({ id: user.id }, "secret");
		return res.json({ token, name: user.name });
	} else {
		return res.status(500).send("not Valid");
	}
});

app.get("/check-auth", (req, res) => {
	try {
		const token = String(req.headers.authorization).split(" ")[1];
		const { id } = jwt.verify(token, "secret");
		const user = users.find((x) => x.id === id);
		if (user) {
			res.json({ token, name: user.name });
		}
	} catch (error) {
		res.status(500).send("Not Authorized");
	}
});

app.get("/secret", (req, res) => {
	// check
	try {
		const token = String(req.headers.authorization).split(" ")[1];
		const { id } = jwt.verify(token, "secret");
		const user = users.find((x) => x.id === id);

		if (user) {
			res.json({ secret: "I am secret Data", user });
		}
	} catch (error) {
		res.status(501).send("Bad Request");
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
