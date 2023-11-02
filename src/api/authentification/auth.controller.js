import {
	signupForAdminHandler,
	signupForFreelancerHandler,
	signupForCompanyHandler,
	isValidUserAndGetInfos,
	findUserByEmailHandler,
	// updateUserEntrepriseResetToken,
	// findUserEntrepriseByResetToken,
	// updateUserEntreprisePassword,
	// validationAccountsForCompanyHandler,
	// validationAccountsForFreelancerHandler,
} from "./handler.js";
import { validationAuth } from "../utils/auth.validationUtils.js";
import {
	validateAdminSignup,
	validateFreelancerSignup,
	validateEntrepriseSignup,
} from "./validation.js";
import { validationMessages } from "../errors/index.js";
// import UserEntreprise from "../../databases/models/user_Entreprise.js";
// import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
// import UserFreelancer from "../../databases/models/user_Freelancer.js";
// import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
// import User from "../../databases/models/user_Admin.js";
// import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import {
	generateUniqueToken,
	generateAuthToken,
} from "../utils/auth.validationUtils.js";
import { sendValidationEmail } from "../../service/validationCode.mail.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await findUserByEmailHandler(email);
		if (typeof user === "String") {
			throw new Error("Utilisateur non trouvé.");
		}
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
		const result = await findUserByEmailHandler(email);
		res.status(200).json({ message: result });
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
				"Une erreur est survenue lors de la validation, veuillez reessaier",
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
				"Votre compte est maintenant prête a être utiliser,Veulle la confirmer",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Une erreur est survenue lors de l'inscription" });
	}
};
// export const validationAccountsForCompany = async (req, res) => {
// 	try {
// 		const { token, email } = req.body;
// 		const result = await validationAccountsForCompanyHandler(token, email);

// 		return res.status(201).json({ message: result });
// 	} catch (error) {
// 		res.status(500).json({
// 			message:
// 				"Une erreur est survenue lors de la validation, veuillez reessaier",
// 		});
// 	}
// };
export const signupForFreelancer = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			validateFreelancerSignup,
			validationMessages
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
		return res
			.status(200)
			.json({ message: "Inscription réussie pour le compte Freelancer" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Une erreur est survenue lors de l'inscription ici" });
	}
};
// export const validationAccountsForFreelancer = async (req, res) => {
// 	try {
// 		const { token, email } = req.body;
// 		const result = await validationAccountsForFreelancerHandler(token, email);

// 		return res.status(201).json({ message: result });
// 	} catch (error) {
// 		res.status(500).json({
// 			message:
// 				"Une erreur est survenue lors de la validation, veuillez reessaier",
// 		});
// 	}
// };
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

// export const requestPasswordResetEntreprise = async (req, res) => {
// 	try {
// 		const { email } = req.body;
// 		const user = await UserEntrepriseRepository.getUserByEmail(email);

// 		if (!user) {
// 			return res.status(400).json({ message: "Utilisateur introuvable." });
// 		}
// 		const resetToken = generateUniqueToken();
// 		const resetTokenExpiry = new Date(
// 			Date.now() + CONFIRMATION_TOKEN_EXPIRATION
// 		);
// 		await updateUserEntrepriseResetToken(user.id, resetToken, resetTokenExpiry);
// 		await sendValidationEmail(email, resetToken);

// 		return res.status(200).json({
// 			message: "Un e-mail a été envoyé pour réinitialiser votre mot de passe.",
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			message:
// 				"Une erreur est survenue lors de la réinitialisation du mot de passe.",
// 		});
// 	}
// };
// export const validationTokenEntreprise = async (req, res) => {
// 	const { token } = req.params;

// 	try {
// 		const user = await findUserEntrepriseByResetToken(token);

// 		if (!user || user.resetPasswordExpires < Date.now()) {
// 			return res.status(400).json({
// 				message: "Le lien de réinitialisation est invalide ou a expiré.",
// 			});
// 		}

// 		return res
// 			.status(200)
// 			.json({ message: "Le jeton de réinitialisation est valide." });
// 	} catch (error) {
// 		res.status(500).json({
// 			message:
// 				"Une erreur est survenue lors de la validation du jeton de réinitialisation.",
// 		});
// 	}
// };
// export const resetPasswordEntreprise = async (req, res) => {
// 	const { token, newPassword } = req.body;

// 	try {
// 		const user = await findUserEntrepriseByResetToken(token);

// 		if (!user || user.resetPasswordExpires < Date.now()) {
// 			return res.status(400).json({
// 				message: "Le lien de réinitialisation est invalide ou a expiré.",
// 			});
// 		}

// 		const hashedPassword = await bcrypt.hash(newPassword, 10);
// 		await updateUserEntreprisePassword(user.id, hashedPassword);
// 		await clearUserResetToken(user.id);

// 		return res
// 			.status(200)
// 			.json({ message: "Mot de passe réinitialisé avec succès." });
// 	} catch (error) {
// 		res.status(500).json({
// 			message:
// 				"Une erreur est survenue lors de la réinitialisation du mot de passe.",
// 		});
// 	}
// };
