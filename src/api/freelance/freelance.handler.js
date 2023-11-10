import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();
const dayValidityRepository = new DayValidityRepository();

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
};
