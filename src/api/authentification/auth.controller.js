import { validation } from "./auth.utils.js";
import {
	freelanceSignupValidationRules,
	companySignupValidationRules,
	adminSignupValidationRules,
} from "./auth.errors_message.js";
import {
	validateFreelanceSignup,
	validateCompanySignup,
	validateAdminSignup,
} from "./auth.validation.js";
import {
	signupForFreelancerHandler,
	signupForAdminHandler,
	signupForCompanyHandler,
	isEmailValidHandler,
	isEmailAvailableHandler,
	doesEmailExistHandler,
	resendValidationCodeHanler,
	resetPasswordHandler,
	validateResetTokenHandler,
	generateAndSendResetTokenHandler,
	loginHandler,
} from "./auth.handler.js";
import {
	sendValidationEmailConfirmation,
	sendResetPasswordByEmail,
} from "../../service/auth.email.js";
import { generateUniqueToken } from "./auth.utils.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const destinationPath = path.join(__dirname, "../../public", "cin");

const login = async (req, res) => {
	const data = req.body;
	try {
		const result = await loginHandler(data);

		res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const isEmailAvailable = async (req, res) => {
	const { email } = req.params;
	try {
		const response = await isEmailAvailableHandler(email);
		return res.status(200).json({ response });
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const isEmailValid = async (req, res) => {
	const { token, email } = req.body;
	try {
		const result = await isEmailValidHandler(token, email);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const doesEmailExist = async (req, res) => {
	const { email } = req.params;
	try {
		await doesEmailExistHandler(email);
		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const signupForFreelancer = async (req, res) => {
	try {
		const { isAcceptedContract, ...userData } = req.body;
		const cin = req.file?.filename;
		if (isAcceptedContract) {
			userData.isAcceptedContract = isAcceptedContract === "true";
		}
		const errors = await validation(
			userData,
			validateFreelanceSignup,
			freelanceSignupValidationRules
		);

		if (errors) {
			if (req.file?.filename) {
				const filePath = path.join(destinationPath, req.file?.filename);
				fs.unlinkSync(filePath);
			}
			return res.status(400).json({ message: errors });
		}

		userData.emailVerificationCode = generateUniqueToken();
		userData.cin = cin;

		const result = await signupForFreelancerHandler(userData);

		await sendValidationEmailConfirmation(
			userData.email,
			userData.emailVerificationCode
		);

		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const signupForCompany = async (req, res) => {
	try {
		const errors = await validation(
			req,
			validateCompanySignup,
			companySignupValidationRules
		);

		if (errors) {
			return res.status(400).json({ message: errors });
		}

		const userData = {
			...req.body,
			emailVerificationCode: generateUniqueToken(),
		};

		const result = await signupForCompanyHandler(userData);

		await sendValidationEmailConfirmation(
			userData.representantEmail,
			userData.emailVerificationCode
		);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
const signupForAdmin = async (req, res) => {
	try {
		const errors = await validation(
			req,
			validateAdminSignup,
			adminSignupValidationRules
		);

		if (errors) {
			return res.status(400).json({ message: errors });
		}

		const result = await signupForAdminHandler(req.body);

		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const resendValidationCode = async (req, res) => {
	try {
		const { email } = req.params;
		const newValidationCode = generateUniqueToken();
		const result = await resendValidationCodeHanler(email, newValidationCode);
		await sendValidationEmailConfirmation(email, newValidationCode);
		return res.status(200).json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email, token, newPassword } = req.body;
		const result = await resetPasswordHandler(email, token, newPassword);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		return res.status(500).json({
			messsage: error.message,
		});
	}
};
const validateResetToken = async (req, res) => {
	try {
		const token = req.params.token;
		const result = await validateResetTokenHandler(token);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const generateAndSendResetToken = async (req, res) => {
	try {
		const { email } = req.params;
		const newValidationCode = generateUniqueToken();
		const result = await generateAndSendResetTokenHandler(
			email,
			newValidationCode
		);
		await sendResetPasswordByEmail(email, newValidationCode);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export {
	login,
	signupForFreelancer,
	signupForCompany,
	signupForAdmin,
	isEmailAvailable,
	doesEmailExist,
	isEmailValid,
	resendValidationCode,
	resetPassword,
	generateAndSendResetToken,
	validateResetToken,
};
