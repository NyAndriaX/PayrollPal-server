import { validationResult } from "express-validator";

const freelanceValidation = async (req, requiredData, message) => {
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

export { freelanceValidation };
