import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import UserEntreprise from "../../databases/models/user_Entreprise.js";
import UserFreelancer from "../../databases/models/user_Freelancer.js";
import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import User from "../../databases/models/user_Admin.js";

const userAdminRepository = new UserAdminRepository();
const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();

const existingUserVerification = async (email) => {
	try {
		let user;
		if (await userAdminRepository.getUserByEmail(email)) {
			user = await User.findOne({ email });
		} else if (await userFreelancerRepository.getUserByEmail(email)) {
			user = await UserFreelancer.findOne({ email });
		} else if (await userEntrepriseRepository.getUserByEmail(email)) {
			user = await userEntrepriseRepository.getUserByEmail(email);
		} else {
			return null;
		}

		return user;
	} catch (error) {
		throw new Error(error);
	}
};

const findUserByEmailHandler = async (email) => {
	try {
		let user;
		if (await userAdminRepository.getUserByEmail(email)) {
			user = await User.findOne({ email });
		} else if (await userFreelancerRepository.getUserByEmail(email)) {
			user = await UserFreelancer.findOne({ email });
		} else if (await userEntrepriseRepository.getUserByEmail(email)) {
			user = await userEntrepriseRepository.getUserByEmail(email);
		} else {
			throw new Error("Cet email n'existe pas");
		}

		if (user.roles !== "ROLES_ADMIN" && user.isEmailConfirmed === true) {
			return user;
		} else if (user.roles === "ROLES_ADMIN") {
			return user;
		}

		throw new Error(
			"Cet email n'est pas activer, veuillez chequer votre email"
		);
	} catch (error) {
		throw new Error(error.message);
	}
};

const signupForAdminHandler = async (userData) => {
	try {
		const existingUser = await existingUserVerification(userData.email);
		if (existingUser) {
			return "Cet email est déjà utilisé.";
		}

		const user = await userAdminRepository.createUser(userData);
		return {
			success: true,
			user,
		};
	} catch (error) {
		throw new Error("Erreur lors de l'inscription : " + error.message);
	}
};

const signupForFreelancerHandler = async (userData) => {
	try {
		const existingUser = await existingUserVerification(userData.email);
		if (existingUser) {
			return "Cet email est déjà utilisé.";
		}

		const user = await userFreelancerRepository.createUser(userData);

		return {
			success: true,
			user,
		};
	} catch (error) {
		throw new Error("Erreur lors de l'inscription : " + error.message);
	}
};

const signupForCompanyHandler = async (userData) => {
	try {
		const existingUser = await existingUserVerification(
			userData.emailRepresentant
		);
		if (existingUser) {
			return "Cet email est déjà utilisé.";
		}

		const user = await userEntrepriseRepository.createUser(userData);

		return {
			success: true,
			user,
		};
	} catch (error) {
		throw new Error("Erreur lors de l'inscription : " + error.message);
	}
};

const isValidUserAndGetInfos = async (token, email) => {
	try {
		const user = await existingUserVerification(email);
		if (!user && user.emailVerificationCode !== token) {
			throw new Error("Erreur lors de la validation ");
		}
		user.isEmailConfirmed = true;
		await user.save();
		return {
			success: true,
		};
	} catch (error) {
		throw new Error("Erreur lors de la connexion : " + error.message);
	}
};

// const validationAccountsForCompanyHandler = async (token, email) => {
// 	try {
// 		const userEntrepriseRepository = new UserEntrepriseRepository();
// 		const existingUser =
// 			await userEntrepriseRepository.getEmailVerificationCode(token);
// 		if (!existingUser && existingUser.emailRepresentant !== email) {
// 			throw new Error("Erreur lors de la validation ");
// 		}

// 		existingUser.isEmailConfirmed = true;

// 		await existingUser.save();
// 		return "Validation réussie.";
// 	} catch (error) {
// 		throw new Error("Erreur lors de l'inscription : " + error.message);
// 	}
// };

// const validationAccountsForFreelancerHandler = async (token, email) => {
// 	try {
// 		const userFreelancerRepository = new UserFreelancerRepository();
// 		const userFreelancer =
// 			await userFreelancerRepository.getEmailVerificationCode(token);
// 		if (!userFreelancer && userFreelancer.email !== email) {
// 			throw new Error("Erreur lors de la validation ");
// 		}

// 		userFreelancer.isEmailConfirmed = true;

// 		await userFreelancer.save();
// 		return "Validation réussie.";
// 	} catch (error) {
// 		throw new Error("Erreur lors de l'inscription : " + error.message);
// 	}
// };

// const updateUserEntrepriseResetToken = async (
// 	userId,
// 	resetToken,
// 	resetTokenExpiry
// ) => {
// 	await UserEntreprise.findByIdAndUpdate(userId, {
// 		resetPasswordToken: resetToken,
// 		resetPasswordExpires: resetTokenExpiry,
// 	});
// };

// const findUserEntrepriseByResetToken = async (resetToken) => {
// 	return await UserEntreprise.findOne({
// 		resetPasswordToken: resetToken,
// 		resetPasswordExpires: { $gt: Date.now() },
// 	});
// };
// const updateUserEntreprisePassword = async (userId, hashedPassword) => {
// 	await UserEntreprise.findByIdAndUpdate(userId, {
// 		password: hashedPassword,
// 	});
// };

export {
	signupForAdminHandler,
	signupForFreelancerHandler,
	signupForCompanyHandler,
	isValidUserAndGetInfos,
	existingUserVerification,
	findUserByEmailHandler,
	// updateUserEntrepriseResetToken,
	// findUserEntrepriseByResetToken,
	// updateUserEntreprisePassword,
	// validationAccountsForFreelancerHandler,
	// validationAccountsForCompanyHandler,
};
