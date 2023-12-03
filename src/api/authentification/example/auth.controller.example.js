import {
	signupForAdminHandler,
	signupForFreelancerHandler,
	signupForCompanyHandler,
	isValidUserAndGetInfos,
	getUserByEmail,
	validateUser,
} from "./handler.example.js";
import { validationAuth } from "../../utils/auth.validationUtils.js";
import {
	validateAdminSignup,
	validateFreelancerSignup,
	validateEntrepriseSignup,
} from "../validation.example.js";
import { validationMessages } from "../../errors/index.js";
import {
	generateUniqueToken,
	generateAuthToken,
} from "../../utils/auth.validationUtils.js";
import { sendValidationEmail } from "../../../service/validationCode.mail.js";
import freelanceValidationMessage from "../../errors/freelance.message.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);

		if (!user) {
			throw new Error("Utilisateur non trouvé.");
		}

		const isPasswordValid = await user.comparePassword(password);

		if (!isPasswordValid) {
			throw new Error("Mot de passe incorrect.");
		}

		const authToken = generateAuthToken(user);

		res.status(200).json({ authToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const findUserByEmail = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await getUserByEmail(email);
		validateUser(user);

		res.status(200).json({ message: "Utilisateur trouvé." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const validationEmail = async (req, res) => {
	const { token, email } = req.body;
	try {
		const result = await isValidUserAndGetInfos(token, email);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message:
				"Une erreur est survenue lors de la validation, veuillez réessayer.",
		});
	}
};

export const signupForCompany = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			validateEntrepriseSignup,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const userData = {
			...req.body,
			emailVerificationCode: generateUniqueToken(),
		};

		const result = await signupForCompanyHandler(userData);

		if (typeof result === "string") {
			return res.status(400).json({ error: result });
		}

		await sendValidationEmail(
			userData.emailRepresentant,
			userData.emailVerificationCode
		);

		return res.status(200).json({
			message:
				"Votre compte est maintenant prêt à être utilisé. Veuillez le confirmer.",
		});
	} catch (error) {
		res.status(500).json({
			message: "Une erreur est survenue lors de l'inscription.",
		});
	}
};

export const signupForFreelancer = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			validateFreelancerSignup,
			freelanceValidationMessage
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const userData = {
			...req.body,
			emailVerificationCode: generateUniqueToken(),
		};

		const result = await signupForFreelancerHandler(userData);

		if (typeof result === "string") {
			return res.status(400).json({ error: result });
		}

		await sendValidationEmail(userData.email, userData.emailVerificationCode);

		return res.status(200).json({ result });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Une erreur est survenue lors de l'inscription ici" });
	}
};

export const signupForAdmin = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			validateAdminSignup,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const result = await signupForAdminHandler(req.body);

		if (typeof result === "string") {
			return res.status(400).json({ error: result });
		}

		return res
			.status(200)
			.json({ message: "Inscription réussie pour le compte administration" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Une erreur est survenue lors de l'inscription" });
	}
};

export const changePasswordForAuth = async (req, res) => {
	try {
		// Ajoutez ici la logique pour changer le mot de passe
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};
