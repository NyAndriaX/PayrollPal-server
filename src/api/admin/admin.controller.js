import {
	getUserWithFilter,
	deleteUserHandler,
	geCompanyAllUsersHandler,
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
} from "./admin.handler.js";
import { validateAdminSignup } from "../authentification/validation.js";
import { validationAuth } from "../utils/index.js";
import { validationMessages } from "../errors/index.js";
import {
	adminValidation,
	generateRandomPassword,
} from "../utils/admin.utils.js";
import {
	placementValidateData,
	CompanyVaidationInAdmin,
} from "./admin.validation.js";
import { AdminValidationMessage } from "../errors/index.js";
import { sendCodeAndHTTPInValidationMailForNewAccountCompany } from "../../service/admin.mailer.js";
import {
	generateUniqueToken,
	generateAuthToken,
} from "../utils/auth.validationUtils.js";

const getAllUsers = async (req, res) => {
	try {
		const result = await getUserWithFilter();

		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const deleteUsers = async (req, res) => {
	const { userId, userRoles } = req.params;
	try {
		const result = await deleteUserHandler(userId, userRoles);

		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const getAllUsersFreelance = async (req, res) => {
	try {
		const result = await getFreelanceAllUsersHandler();
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const getAllUsersCompany = async (req, res) => {
	try {
		const result = await geCompanyAllUsersHandler();
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const getUnvalidatedFreelancers = async (req, res) => {
	try {
		const result = await getUnvalidatedFreelancersHandler();
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ error });
	}
};
const validateFreelancers = async (req, res) => {
	const { userId } = req.params;
	try {
		const result = await validateFreelancersHandler(userId);
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const deleteFreelWait = async (req, res) => {
	const { userId } = req.params;
	try {
		const result = await deleteFreelancersWaitHandler(userId);
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};
const createPlacement = async (req, res) => {
	const data = req.body;
	try {
		const validation = await adminValidation(
			req,
			placementValidateData,
			AdminValidationMessage
		);
		if (validation) {
			return res.status(400).json({ message: validation });
		}

		const result = await createPlacementHandler(data);

		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};

const updatePlacement = async (req, res) => {
	const data = req.body;
	const { placementId } = req.params;
	try {
		const validation = await adminValidation(
			req,
			placementValidateData,
			AdminValidationMessage
		);
		if (validation) {
			return res.status(400).json({ message: validation });
		}
		const result = await updatePlacementHandler(placementId, data);

		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};

const deletePlacement = async (req, res) => {
	const { placementId } = req.params;
	try {
		const result = await deletePlacementHandler(placementId);
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};

const getPlacement = async (req, res) => {
	try {
		const result = await getPlacementHandler();
		res.status(200).json({ result });
	} catch (error) {
		res.status(400).json({ Error: error.message });
	}
};

const updatedProfil = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			validateAdminSignup,
			validationMessages
		);
		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}
		const result = await updateProfilHandler(req.body);
		res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const createNewCompany = async (req, res) => {
	try {
		const errorMessage = await validationAuth(
			req,
			CompanyVaidationInAdmin,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}
		const generatePassword = generateRandomPassword();
		const userData = {
			...req.body,
			password: generatePassword,
			isPasswordConfirmed: generatePassword,
			emailVerificationCode: generateUniqueToken(),
		};
		const result = await createAccountCompanyHandler(userData);
		if (typeof result === "string") {
			return res.status(400).json({ error: result });
		}

		await sendCodeAndHTTPInValidationMailForNewAccountCompany(
			userData.emailRepresentant,
			userData.password,
			userData.emailVerificationCode
		);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const getAllCompanyNotCondition = async (req, res) => {
	try {
		const result = await getAllCompanyNotConditionHandler();

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const updatedCompanyUser = async (req, res) => {
	const userData = req.body;
	try {
		const errorMessage = await validationAuth(
			req,
			CompanyVaidationInAdmin,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}
		const result = await updatedCompanyUserHandler(userData);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

export {
	getAllUsers,
	deleteUsers,
	getUnvalidatedFreelancers,
	validateFreelancers,
	deleteFreelWait,
	getAllUsersCompany,
	getAllUsersFreelance,
	createPlacement,
	updatePlacement,
	deletePlacement,
	getPlacement,
	updatedProfil,
	createNewCompany,
	getAllCompanyNotCondition,
	updatedCompanyUser,
};
