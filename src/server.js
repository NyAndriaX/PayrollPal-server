import express from "express";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerOptions.js";
import { configureApp } from "./config/index.js";
import { config } from "dotenv";

const app = express();

config();

configureApp(app);

const PORT = process.env.PORT || 1789;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
