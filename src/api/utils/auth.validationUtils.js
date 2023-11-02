import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";

const generateUniqueToken = () => {
	const token = Math.random().toString(36).substr(2, 10);
	return token;
};

const generateAuthToken = (userData) => {
	const token = jwt.sign({ userData }, config.jwt_token, {
		expiresIn: "24h",
	});
	return token;
};

const validationAuth = async (req, validateSignup, validationMessages) => {
	await Promise.all(validateSignup.map((validation) => validation.run(req)));

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const formattedErrors = errors.array().map((error) => {
			var customMessage = validationMessages.find(
				(msg) => msg.field === error.path
			);
			return {
				field: error.param,
				message: customMessage ? customMessage.message : "Validation failed.",
			};
		});
		return formattedErrors[0].message;
	}

	return null;
};
export { validationAuth, generateUniqueToken, generateAuthToken };
