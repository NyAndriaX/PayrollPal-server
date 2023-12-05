import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";
import { sendCodeAndHTTPInValidationMailForUpdateFreelance } from "../../service/freelance.mailer.js";
import { generateUniqueToken, generateAuthToken } from "./freelance.utils.js";
import { ObjectId } from "mongoose";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();
const dayValidityRepository = new DayValidityRepository();

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

const updatedFreelanceUserHandler = async (userId, userData) => {
	const { email, _id } = userData;

	try {
		const [isFreelanceValid, isEntrepriseValid, isAdminValid, existingUser] =
			await Promise.all([
				userFreelancerRepository.getUserByEmail(email),
				userEntrepriseRepository.getUserByEmail(email),
				userAdminRepository.getUserByEmail(email),
			]);

		if (isAdminValid || isEntrepriseValid) {
			throw new Error("Cet email existe déjà");
		}

		if (existingUser && existingUser.email !== email && isAdminValid) {
			throw new Error("Cet email existe déjà");
		}

		const user = await userFreelancerRepository.updateUserProfile(
			_id,
			userData
		);

		const token = generateAuthToken(existingUser);

		return { user: user, token };
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
