import UserAdminRepository from "../../../databases/repository/userAdminRepository.js";
import UserEntrepriseRepository from "../../../databases/repository/userEntrepriseRepository.js";
import UserFreelancer from "../../../databases/models/user_Freelancer.js";
import UserFreelancerRepository from "../../../databases/repository/userFreelancerRepository.js";
import User from "../../../databases/models/user_Admin.js";

const userAdminRepository = new UserAdminRepository();
const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();

const getUserByEmail = async (email) => {
	try {
		let user;
		if (await userAdminRepository.getUserByEmail(email)) {
			user = await User.findOne({ email });
		} else if (await userFreelancerRepository.getUserByEmail(email)) {
			user = await userFreelancerRepository.getUserByEmail(email);
		} else if (
			await userEntrepriseRepository.getUserByEmailAndAdminValidate(email)
		) {
			user = await userEntrepriseRepository.getUserByEmailAndAdminValidate(
				email
			);
		} else {
			return null;
		}

		return user;
	} catch (error) {
		throw new Error(
			`Erreur lors de la récupération de l'utilisateur par email : ${error.message}`
		);
	}
};

const validateUser = (user) => {
	if (!user) {
		throw new Error("Cet email n'existe pas");
	}

	if (
		user.roles === "ROLES_ADMIN" ||
		(user.isEmailConfirmed && user.roles !== "ROLES_ADMIN")
	) {
		return user;
	}

	throw new Error("Cet email n'est pas activé, veuillez vérifier votre email");
};

const signupHandler = async (userData, repository, emailKey = "email") => {
	try {
		const existingUser = await getUserByEmail(userData[emailKey]);
		if (existingUser) {
			return "Cet email est déjà utilisé.";
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

const signupForAdminHandler = async (userData) =>
	signupHandler(userData, userAdminRepository);
const signupForFreelancerHandler = async (userData) =>
	signupHandler(userData, userFreelancerRepository);
const signupForCompanyHandler = async (userData) =>
	signupHandler(userData, userEntrepriseRepository, "emailRepresentant");

const isValidUserAndGetInfos = async (token, email) => {
	try {
		const user = await getUserByEmail(email);
		if (!user || user.emailVerificationCode !== token) {
			throw new Error("Erreur lors de la validation");
		}

		user.isEmailConfirmed = true;
		await user.save();
		return {
			success: true,
			user,
		};
	} catch (error) {
		throw new Error(`Erreur lors de la connexion : ${error.message}`);
	}
};

export {
	signupForAdminHandler,
	signupForFreelancerHandler,
	signupForCompanyHandler,
	isValidUserAndGetInfos,
	getUserByEmail,
	validateUser,
};
