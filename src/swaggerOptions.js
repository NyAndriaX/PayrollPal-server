import swaggerJsdoc from "swagger-jsdoc";
import { config } from "./config/index.js";
import path from "path";

const currentFilePath = new URL(import.meta.url).pathname;
const currentDirectory = path.dirname(currentFilePath);

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Freelance Management",
			version: "1.0.0",
			description: "API description",
		},
		servers: [
			{
				url: config.fallBack_url,
				description: "Local server",
			},
		],
	},
	apis: [path.resolve(currentDirectory, "api/**/*.route.js")],
};

const specs = swaggerJsdoc(options);

export default specs;
