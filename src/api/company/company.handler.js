import { sendCodeAndHTTPInValidationMailForUpdateCompany } from "../../service/admin.mailer.js";
import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import { convertPlacementDataHandler } from "../admin/admin.handler.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";
import { generateAuthToken } from "./company.utils.js";
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

const updatedCompanyUserHandler = async (userId, userData) => {
	try {
		const existingUser = await getUserByEmail(userData.emailRepresentant);
		if (existingUser && existingUser?._id.equals(new ObjectId(userId))) {
			return "Cet email est déjà utilisé.";
		}

		const user = await userEntrepriseRepository.updateUserProfile(
			userId,
			userData
		);

		const token = generateAuthToken(user);
		return {
			user,
			token,
		};
	} catch (error) {
		throw error;
	}
};

const fetchAllFreelanceHandler = async (idEntreprise) => {
	try {
		const result = await placementRepository.getPlacementWidthIdEntreprise(
			idEntreprise
		);
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
		return response;
	} catch (error) {
		throw error;
	}
};

const deleteOnePlacementInThisCompanyHandler = async (
	idEntreprise,
	idFreelance
) => {
	try {
		const placement =
			await placementRepository.getPlacementWidthIdFreelanceAndIdEntreprise(
				idFreelance,
				idEntreprise
			);
		if (placement.length === 0) {
			throw new Error("Cet placement n'existe plus");
		}

		await placementRepository.deletePlacement(placement[0]._id);

		return {
			success: true,
			placementId: placement[0]._id,
		};
	} catch (error) {
		throw error;
	}
};

const validationDayValidityHandler = async (dayValidityId, idPlacement) => {
	try {
		const response = await dayValidityRepository.dayValiditing(
			dayValidityId,
			idPlacement
		);
		return response;
	} catch (error) {
		throw error;
	}
};

const refuseDayValidityHandler = async (dayValidityId, idPlacement) => {
	try {
		const response = await dayValidityRepository.dayRefusing(
			dayValidityId,
			idPlacement
		);
		return response;
	} catch (error) {
		throw error;
	}
};

const fetchAllDayDumpByFreelanceHandler = async (idEntreprise) => {
	try {
		const placements = await placementRepository.getPlacementWidthIdEntreprise(
			idEntreprise
		);

		if (!placements || placements.length === 0) {
			return [];
		}

		const allDayDumps = await Promise.all(
			placements.map(async (placement) => {
				try {
					const dayDump =
						await dayValidityRepository.getDayDumpInThisMonthByPlacementId(
							placement._id
						);

					if (dayDump) {
						const freelanceDetailsArray =
							await userFreelancerRepository.getAdminValidatedFreelancers(
								placement.idFreelance
							);
						const freelanceDetails = freelanceDetailsArray[0];
						return { ...dayDump, freelanceDetails };
					}
				} catch (dayDumpError) {
					throw dayDumpError;
				}
			})
		);

		const filteredDayDumps = allDayDumps.filter(
			(dayDump) => dayDump !== undefined
		);

		return filteredDayDumps || [];
	} catch (placementError) {
		throw placementError;
	}
};

export {
	updatedCompanyUserHandler,
	fetchAllFreelanceHandler,
	deleteOnePlacementInThisCompanyHandler,
	validationDayValidityHandler,
	refuseDayValidityHandler,
	fetchAllDayDumpByFreelanceHandler,
};
