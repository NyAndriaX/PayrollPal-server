import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";
import { convertPlacementDataHandler } from "../admin/admin.handler.js";
import { generateAuthToken } from "./freelance.utils.js";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();
const dayValidityRepository = new DayValidityRepository();

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
const fetchDayValidityInThisMonthByPlacementIdhandler = async (placementId) => {
	try {
		const response =
			await dayValidityRepository.getDayDumpInThisMonthByPlacementId(
				placementId
			);
		return response;
	} catch (error) {
		throw error;
	}
};

const fetchDayValidityByPlacementIdHandler = async (placementId) => {
	try {
		const response = await dayValidityRepository.getDayDumpInByPlacementId(
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
		const convertedResult = await convertPlacementDataHandler(response[0]);
		return convertedResult;
	} catch (error) {
		throw error;
	}
};

export {
	depositDayValidityHandler,
	fetchDayValidityInThisMonthByPlacementIdhandler,
	fetchPlacementToStockThisFreelanceService,
	fetchDayValidityByPlacementIdHandler,
	updatedFreelanceUserHandler,
};
