import { sendCodeAndHTTPInValidationMailForUpdateCompany } from "../../service/admin.mailer.js";
import { existingUserVerification } from "../authentification/handler.js";
import UserFreelancerRepository from "../../databases/repository/userFreelancerRepository.js";
import UserEntrepriseRepository from "../../databases/repository/userEntrepriseRepository.js";
import PlacementRepository from "../../databases/repository/placementRepository.js";
import UserAdminRepository from "../../databases/repository/userAdminRepository.js";
import { ObjectId } from "mongoose";
import { generateAuthToken } from "../utils/auth.validationUtils.js";

const userFreelancerRepository = new UserFreelancerRepository();
const userEntrepriseRepository = new UserEntrepriseRepository();
const userAdminRepository = new UserAdminRepository();
const placementRepository = new PlacementRepository();

const updatedCompanyUserHandler = async (userId, userData) => {
	console.log(userData);
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

export { updatedCompanyUserHandler };
