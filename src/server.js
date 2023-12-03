import express from "express";
import swaggerUi from "swagger-ui-express";
import { configureApp } from "./config/index.js";
import specs from "./swaggerOptions.js";
import { config } from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configureApp(app);

const PORT = process.env.PORT || 1789;

app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
