import { validationResult } from "express-validator";

const adminValidation = async (req, requiredData, message) => {
	await Promise.all(requiredData.map((validation) => validation.run(req)));

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const formattedErrors = errors.array().map((error) => {
			var customMessage = message.find((msg) => error.path === msg.field);
			return {
				field: error.param,
				message: customMessage ? customMessage.message : "Validation failed.",
			};
		});
		return formattedErrors[0].message;
	}

	return null;
};

const generateRandomPassword = () => {
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const passwordLength = 8;
	let password = "";

	for (let i = 0; i < passwordLength; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}

	return password;
};

export { adminValidation, generateRandomPassword };
