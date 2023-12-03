import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import { generateAuthToken } from "./auth.utils.js";
import bcrypt from "bcrypt";

const userAdminRepository = new UserAdminRepository();
const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();

const getUserByEmail = async (email) => {
	try {
		let user;
		if (await userAdminRepository.getUserByEmail(email)) {
			user = await userAdminRepository.getUserByEmail(email);
		} else if (await userFreelancerRepository.getUserByEmail(email)) {
			user = await userFreelancerRepository.getUserByEmail(email);
		} else if (await userEntrepriseRepository.getUserByEmail(email)) {
			user = await userEntrepriseRepository.getUserByEmail(email);
		} else {
			return null;
		}

		return user;
	} catch (error) {
		throw error;
	}
};

const isEmailAvailableHandler = async (email) => {
	try {
		const user = await getUserByEmail(email);
		if (user) {
			throw new Error("Cet email est déjà utilisé");
		}
		return {
			success: true,
		};
	} catch (error) {
		throw error;
	}
};

const doesEmailExistHandler = async (email) => {
	try {
		const user = await getUserByEmail(email);
		if (!user) {
			throw new Error("Cet email n'existe pas");
		}

		if (
			user.roles === "ROLES_ADMIN" ||
			(user.isEmailConfirmed && user.roles !== "ROLES_ADMIN")
		) {
			return {
				success: true,
				user,
			};
		}

		throw new Error(
			"Cet email n'est pas activé, veuillez vérifier votre email"
		);
	} catch (error) {
		throw error;
	}
};

const signupHandler = async (userData, repository, emailKey = "email") => {
	try {
		const existingUser = await getUserByEmail(userData[emailKey]);
		if (existingUser) {
			throw new Error("Cet email est déjà utilisé.");
		}

		const user = await repository.createUser(userData);
		return {
			success: true,
			user,
		};
	} catch (error) {
		throw new Error(`Erreur lors de l'inscription : ${error.message}`);
	}
};

const isEmailValidHandler = async (token, email) => {
	try {
		const user = await getUserByEmail(email);
		if (!user || user.emailVerificationCode !== token) {
			throw new Error("Le code de validation est incorrect.");
		}

		user.isEmailConfirmed = true;
		await user.save();
		return {
			success: true,
			user,
		};
	} catch (error) {
		throw error;
	}
};

const loginHandler = async (data) => {
	const { email, password } = data;
	try {
		const result = await doesEmailExistHandler(email);

		const user = result?.user;

		const isPasswordValid = await user.comparePassword(password);

		if (!isPasswordValid) {
			throw new Error("Mot de passe incorrect");
		}
		const token = generateAuthToken(user);
		return token;
	} catch (error) {
		throw error;
	}
};

const resendValidationCodeHanler = async (email, newValidationCode) => {
	try {
		const user = await getUserByEmail(email);

		if (!user) {
			throw new Error("Vous devriez d'abord vous inscrire.");
		}

		if (!user.emailVerificationCode) {
			throw new Error(
				"Le code de vérification n'est pas défini pour cet utilisateur."
			);
		}

		user.emailVerificationCode = newValidationCode;

		await user.save();

		return {
			success: true,
		};
	} catch (error) {
		throw error;
	}
};
const resetPasswordHandler = async (email, token, newPassword) => {
	try {
		let user;
		if (await userAdminRepository.getUserByEmail(email)) {
			user = await userAdminRepository.resetPassword(email, token);
		} else if (await userFreelancerRepository.getUserByEmail(email)) {
			user = await userFreelancerRepository.resetPassword(email, token);
		} else if (await userEntrepriseRepository.getUserByEmail(email)) {
			user = await userEntrepriseRepository.resetPassword(email, token);
		} else {
			throw new Error(
				"Cette adresse e-mail n'existe pas. Veuillez fournir une adresse e-mail valide."
			);
		}

		if (!user) {
			return res.status(400).json({ message: "Token invalide ou expiré." });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;

		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();
		return {
			success: true,
		};
	} catch (error) {
		throw error;
	}
};

const validateResetTokenHandler = async (token) => {
	try {
		const userModelTable = [
			userAdminRepository,
			userFreelancerRepository,
			userEntrepriseRepository,
		];

		for (const userModel of userModelTable) {
			try {
				const user = await userModel?.validateResetToken(token);

				if (user) {
					return {
						success: true,
					};
				}
			} catch (error) {
				throw error;
			}
		}

		throw new Error("Votre code de validation est incorrect.");
	} catch (error) {
		throw error;
	}
};

const generateAndSendResetTokenHandler = async (email, newValidationCode) => {
	try {
		let user = await getUserByEmail(email);
		if (!user) {
			throw new Error("Aucun compte n'est associé à cet e-mail.");
		}
		user.resetPasswordToken = newValidationCode;
		user.resetPasswordExpires = Date.now() + 3600000;
		await user.save();
		return {
			success: true,
		};
	} catch (error) {
		throw error;
	}
};

const signupForAdminHandler = async (userData) =>
	signupHandler(userData, userAdminRepository);
const signupForFreelancerHandler = async (userData) =>
	signupHandler(userData, userFreelancerRepository);
const signupForCompanyHandler = async (userData) =>
	signupHandler(userData, userEntrepriseRepository, "representantEmail");

export {
	signupForFreelancerHandler,
	signupForAdminHandler,
	signupForCompanyHandler,
	isEmailAvailableHandler,
	isEmailValidHandler,
	doesEmailExistHandler,
	resendValidationCodeHanler,
	validateResetTokenHandler,
	resetPasswordHandler,
	generateAndSendResetTokenHandler,
	loginHandler,
};
