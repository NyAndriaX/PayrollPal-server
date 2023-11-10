import { sendCodeAndHTTPInValidationMailForUpdateCompany } from "../../service/admin.mailer.js";
import { existingUserVerification } from "../authentification/handler.js";
import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import { convertPlacementDataHandler } from "../admin/admin.handler.js";
import { ObjectId } from "mongoose";
import { generateAuthToken } from "../utils/auth.validationUtils.js";
import DayValidityRepository from "../../databases/repository/dayValidityRepository.js";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();
const dayValidityRepository = new DayValidityRepository();

const updatedCompanyUserHandler = async (userId, userData) => {
	try {
		const existingUser = await existingUserVerification(
			userData.emailRepresentant
		);
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

		const allDayDumps = await Promise.all(
			placements.map(async (placement) => {
				const dayDump = await dayValidityRepository.getDayDumpByPlacementId(
					placement._id
				);

				const freelanceDetailsArray =
					await userFreelancerRepository.getAdminValidatedUsersAndId(
						placement.idFreelance
					);

				const freelanceDetails = freelanceDetailsArray[0];

				const dayDumpWithFreelance = { ...dayDump, freelanceDetails };

				return dayDumpWithFreelance;
			})
		);
		return allDayDumps;
	} catch (error) {
		throw error;
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
