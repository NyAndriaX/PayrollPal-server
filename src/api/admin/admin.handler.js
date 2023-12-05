import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import { sendCodeAndHTTPInValidationMailForUpdateCompany } from "../../service/admin.mailer.js";
import { generateAuthToken, generateUniqueToken } from "./admin.utils.js";
import User from "../../databases/models/user_Admin.js";
import { ObjectId } from "mongoose";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();

const getUserByEmail = async (email) => {
	try {
		const userAdmin = await userAdminRepository.getUserByEmail(email);
		const userFreelancer = await userFreelancerRepository.getUserByEmail(email);
		const userEntreprise = await userEntrepriseRepository.getUserByEmail(email);

		return userAdmin || userFreelancer || userEntreprise || null;
	} catch (error) {
		throw error;
	}
};

const getUserWithFilter = async () => {
	try {
		const usersEntreprise =
			await userEntrepriseRepository.getAllConfirmedUsers();
		const usersFreelance =
			await userFreelancerRepository.getAdminValidatedFreelancers();

		return [...usersEntreprise, ...usersFreelance];
	} catch (error) {
		throw new Error(error);
	}
};

const deleteUserHandler = async (userId, userRoles) => {
	try {
		const userModel =
			userRoles === "ROLES_FREELANCE"
				? userFreelancerRepository
				: userEntrepriseRepository;

		const result = await userModel.deleteUser(userId);

		if (!result) {
			throw new Error("Utilisateur non trouvé");
		}

		return "Utilisateur supprimé avec succès";
	} catch (error) {
		throw new Error(error);
	}
};

const getFreelanceAllUsersHandler = async () => {
	const allFreelanceUsersHandler = [];
	try {
		const freelanceUsers =
			await userFreelancerRepository.getAdminValidatedFreelancers();

		allFreelanceUsersHandler.push(...freelanceUsers);
		return allFreelanceUsersHandler;
	} catch (error) {
		throw new Error(error);
	}
};

const getCompanyAllUsersHandler = async () => {
	const allCompanyUsersHandler = [];
	try {
		const companyUsers = await userEntrepriseRepository.getAllConfirmedUsers();

		allCompanyUsersHandler.push(...companyUsers);
		return allCompanyUsersHandler;
	} catch (error) {
		throw new Error(error);
	}
};

const getUnvalidatedFreelancersHandler = async () => {
	try {
		const unvalidatedFreelancersUser =
			await userFreelancerRepository.getAdminNotValidatedFreelancers();
		return unvalidatedFreelancersUser || [];
	} catch (error) {
		throw new Error(error);
	}
};

const validateFreelancersHandler = async (userId) => {
	try {
		const validateFreelancersUser =
			await userFreelancerRepository.getAdminNotValidatedFreelancerById(userId);

		if (!validateFreelancersUser) {
			throw new Error("Cet utilisateur n'existe plus ");
		}
		const user = validateFreelancersUser;
		user.adminValidate = true;
		await user.save();
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteFreelancersWaitHandler = async (userId) => {
	try {
		const validateFreelancersWaitUser =
			await userFreelancerRepository.deleteUser(userId);
		return validateFreelancersWaitUser;
	} catch (error) {
		throw new Error(error);
	}
};

const convertPlacementDataHandler = async (placement) => {
	try {
		const freelance = await userFreelancerRepository.getUserById(
			placement.idFreelance
		);

		const freelanceChasseur = await userFreelancerRepository.getUserById(
			placement.idFreelanceChasseur
		);

		const entreprise = await userEntrepriseRepository.getUserById(
			placement.idEntreprise
		);

		const convertedData = {
			_id: placement._id,
			Freelance: {
				id: placement.idFreelance,
				nom: freelance?.nom,
				prenom: freelance?.prenom,
				tel: freelance?.tel,
			},
			FreelanceChasseur: {
				id: placement.idFreelanceChasseur,
				nom: freelanceChasseur?.nom,
				prenom: freelanceChasseur?.prenom,
				tel: freelanceChasseur?.tel,
			},
			entreprise: {
				id: placement.idEntreprise,
				raisonSocial: entreprise?.raisonSocial,
			},
			tjm: placement.tjm,
		};

		return convertedData;
	} catch (error) {
		throw new Error(error);
	}
};

const createPlacementHandler = async (data) => {
	try {
		const { idFreelance, idFreelanceChasseur, idEntreprise } = data;

		const isPlacementExist =
			await placementRepository.getPlacementWidthIdFreelanceAndIdEntreprise(
				idFreelance,
				idEntreprise
			);

		if (isPlacementExist.length !== 0) {
			throw new Error("Le placement a déjà été effectué");
		}

		const isFreelanceValid =
			await userFreelancerRepository.getAdminValidatedFreelancers(idFreelance);

		if (isFreelanceValid.length === 0) {
			throw new Error("Le freelance n'est pas valide.");
		}

		const isChasseurValid =
			await userFreelancerRepository.getAdminValidatedFreelancers(
				idFreelanceChasseur
			);

		if (isChasseurValid.length === 0) {
			throw new Error("Le freelance chasseur n'est pas valide.");
		}

		const isEntrepriseValid =
			await userEntrepriseRepository.getConfirmedUserById(idEntreprise);

		if (isEntrepriseValid.length === 0) {
			throw new Error("L'entreprise n'est pas valide.");
		}

		const result = await placementRepository.createPlacement(data);
		const response = await convertPlacementDataHandler(result);

		return response;
	} catch (error) {
		throw new Error(error);
	}
};

const updatePlacementHandler = async (placementId, placementData) => {
	const { idFreelance, idFreelanceChasseur, idEntreprise } = placementData;
	try {
		const isPlacementValid = await placementRepository.getPlacementWithId(
			placementId
		);
		if (isPlacementValid.length === 0) {
			throw new Error("Le placement n'est pas valide");
		}
		const isFreelanceValid =
			await userFreelancerRepository.getAdminValidatedUsersAndId(idFreelance);
		if (isFreelanceValid.length === 0) {
			throw new Error("Le freelance n'est pas valide.");
		}

		const isChasseurValid =
			await userFreelancerRepository.getAdminValidatedUsersAndId(
				idFreelanceChasseur
			);
		if (isChasseurValid.length === 0) {
			throw new Error("Le freelance chasseur n'est pas valide.");
		}

		const isEntrepriseValid = await userEntrepriseRepository.getUserWithId(
			idEntreprise
		);
		if (isEntrepriseValid.length === 0) {
			throw new Error("L'entreprise n'est pas valide.");
		}

		const result = await placementRepository.updatePlacement(
			placementId,
			placementData
		);
		const convertedResult = await convertPlacementDataHandler(result);

		return convertedResult;
	} catch (error) {
		throw error;
	}
};

const deletePlacementHandler = async (placementId) => {
	try {
		const result = await placementRepository.deletePlacement(placementId);
		return result;
	} catch (error) {
		throw error;
	}
};
const getPlacementHandler = async () => {
	try {
		const result = await placementRepository.getAllPlacement();
		if (result.length === 0) {
			return [];
		}
		const response = result.map((placement) => {
			return convertPlacementDataHandler(placement);
		});

		const nonUndefinedOrNullResponse = response.filter(
			(item) => item !== undefined && item !== null
		);

		if (nonUndefinedOrNullResponse.length === 0) {
			return [];
		}

		const convertedResult = await Promise.all(nonUndefinedOrNullResponse);

		const filteredResult = convertedResult.filter(
			(item) => item && Object.keys(item).length > 0
		);

		return filteredResult;
	} catch (error) {
		throw error;
	}
};

const updateProfilHandler = async (data) => {
	const { email, _id } = data;

	try {
		const [isFreelanceValid, isEntrepriseValid, isAdminValid, existingUser] =
			await Promise.all([
				userFreelancerRepository.getUserByEmail(email),
				userEntrepriseRepository.getUserByEmail(email),
				userAdminRepository.getUserByEmail(email),
				User.findById(_id),
			]);

		if (isFreelanceValid || isEntrepriseValid) {
			throw new Error("Cet email existe déjà");
		}

		if (existingUser && existingUser.email !== email && isAdminValid) {
			throw new Error("Cet email existe déjà");
		}

		const user = await userAdminRepository.updateUserProfile(_id, data);

		const token = generateAuthToken(existingUser);

		return { user: user, token };
	} catch (error) {
		throw new Error(
			`Erreur lors de la mise à jour du profil : ${error.message}`
		);
	}
};

const createAccountCompanyHandler = async (userData) => {
	try {
		const existingUser = await getUserByEmail(userData.emailRepresentant);
		if (existingUser) {
			return "Cet email est déjà utilisé.";
		}
		const user = await userEntrepriseRepository.createUser(userData);

		return {
			success: true,
			user,
		};
	} catch (error) {
		throw error;
	}
};

const getAllCompanyNotConditionHandler = async () => {
	try {
		const user = await userEntrepriseRepository.getAllConfirmedUsers();
		return user;
	} catch (error) {
		throw error;
	}
};

const updatedCompanyUserHandler = async (userId, userData) => {
	try {
		const existingUser = await getUserByEmail(userData.emailRepresentant);
		if (existingUser && existingUser?._id.equals(new ObjectId(userId))) {
			return "Cet email est déjà utilisé.";
		}

		const user = await userEntrepriseRepository.getUserById(userId);

		if (user.emailRepresentant !== userData.emailRepresentant) {
			user.isEmailConfirmed = false;
			user.emailRepresentant = userData.emailRepresentant;
			user.emailVerificationCode = generateUniqueToken();
			await sendCodeAndHTTPInValidationMailForUpdateCompany(
				user.emailRepresentant,
				user.emailVerificationCode
			);
		}
		user.nomRepresentant = userData.nomRepresentant;
		user.prenomRepresentant = userData.prenomRepresentant;
		user.raisonSocial = userData.raisonSocial;
		user.adresseEntreprise = userData.adresseEntreprise;
		user.adresseRepresentant = userData.adresseRepresentant;
		user.numeroIdentificationFiscale = userData.numeroIdentificationFiscale;
		user.telRepresentant = userData.telRepresentant;
		await user.save();
		return {
			succes: true,
			user,
		};
	} catch (error) {
		throw error;
	}
};

export {
	getUserWithFilter,
	deleteUserHandler,
	getCompanyAllUsersHandler,
	getFreelanceAllUsersHandler,
	getUnvalidatedFreelancersHandler,
	validateFreelancersHandler,
	deleteFreelancersWaitHandler,
	createPlacementHandler,
	updatePlacementHandler,
	deletePlacementHandler,
	getPlacementHandler,
	updateProfilHandler,
	createAccountCompanyHandler,
	getAllCompanyNotConditionHandler,
	updatedCompanyUserHandler,
	convertPlacementDataHandler,
};
