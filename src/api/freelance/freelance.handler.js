import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";
import { existingUserVerification } from "../authentification/handler.js";
import { generateUniqueToken } from "../utils/auth.validationUtils.js";
import { generateAuthToken } from "../utils/auth.validationUtils.js";
import { sendCodeAndHTTPInValidationMailForUpdateFreelance } from "../../service/freelance.mailer.js";
import { ObjectId } from "mongoose";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();
const dayValidityRepository = new DayValidityRepository();

const updatedFreelanceUserHandler = async (userId, userData) => {
	try {
		const existingUser = await existingUserVerification(userData.email);
		if (existingUser && existingUser?._id.equals(new ObjectId(userId))) {
			return "Cet email est déjà utilisé.";
		}

		const userArray =
			await userFreelancerRepository.getAdminValidatedUsersAndId(userId);
		const user = userArray[0];

		if (user.email !== userData.email) {
			user.isEmailConfirmed = false;
			user.email = userData.email;
			user.emailVerificationCode = generateUniqueToken();
			await sendCodeAndHTTPInValidationMailForUpdateFreelance(
				user.email,
				user.emailVerificationCode
			);
		}
		user.nom = userData.nom;
		user.prenom = userData.prenom;
		user.adresse = userData.adresse;
		user.tel = userData.tel;
		user.informationsBancaires.IBAN = userData.informationsBancaires.IBAN;
		user.informationsBancaires.BIC = userData.informationsBancaires.BIC;
		user.informationsBancaires.nomTitulaire =
			userData.informationsBancaires.nomTitulaire;
		await user.save();
		const authToken = generateAuthToken(user);
		return {
			succes: true,
			user,
			authToken,
		};
	} catch (error) {
		throw error;
	}
};

const depositDayValidityHandler = async (data) => {
	try {
		const response = await dayValidityRepository.createDayValidity(data);
		return response;
	} catch (error) {
		throw error;
	}
};
const fetchDayValidityWidthPlacementIdhandler = async (placementId) => {
	try {
		const response = await dayValidityRepository.getDayDumpByPlacementId(
			placementId
		);
		return response;
	} catch (error) {
		throw error;
	}
};
const fetchPlacementToStockThisFreelanceService = async (idFreelance) => {
	try {
		const response = await placementRepository.getPlacementsByFreelanceId(
			idFreelance
		);
		return response;
	} catch (error) {
		throw error;
	}
};

export {
	depositDayValidityHandler,
	fetchDayValidityWidthPlacementIdhandler,
	fetchPlacementToStockThisFreelanceService,
	updatedFreelanceUserHandler,
};
