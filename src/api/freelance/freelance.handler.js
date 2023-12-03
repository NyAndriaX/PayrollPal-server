import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";
import { getUserByEmail } from "../authentification/example/handler.example.js";
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
		const user = await userFreelancerRepository.getUserById(userId);

		if (userData.email && user.email !== userData.email) {
			user.isEmailConfirmed = false;
			user.email = userData.email;
			user.emailVerificationCode = generateUniqueToken();
			await sendCodeAndHTTPInValidationMailForUpdateFreelance(
				user.email,
				user.emailVerificationCode
			);
		}

		Object.keys(userData).forEach((key) => {
			if (key !== "email" && user.hasOwnProperty(key)) {
				user[key] = userData[key];
			}
		});

		await user.save();

		const authToken = generateAuthToken(user);
		return {
			success: true,
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
