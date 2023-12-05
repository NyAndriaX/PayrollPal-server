import {
	updatedCompanyUserHandler,
	fetchAllFreelanceHandler,
	deleteOnePlacementInThisCompanyHandler,
	validationDayValidityHandler,
	refuseDayValidityHandler,
	fetchAllDayDumpByFreelanceHandler,
} from "./company.handler.js";
import { validation } from "./company.utils.js";
import { CompanyValidation } from "./company.validation.js";
import { companyValidationSignupMessages } from "./company.errors_message.js";

const updatedCompanyUser = async (req, res) => {
	const { userId } = req.params;
	const userData = req.body;
	try {
		const errorMessage = await validation(
			req,
			CompanyValidation,
			companyValidationSignupMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const result = await updatedCompanyUserHandler(userId, userData);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const fetchAllFreelancer = async (req, res) => {
	const { idEntreprise } = req.params;
	try {
		const result = await fetchAllFreelanceHandler(idEntreprise);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const deleteOnePlacementInThisCompany = async (req, res) => {
	const { idEntreprise, idFreelance } = req.params;
	try {
		const result = await deleteOnePlacementInThisCompanyHandler(
			idEntreprise,
			idFreelance
		);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const validationDayValidity = async (req, res) => {
	const { dayValidityId, idPlacement } = req.params;
	try {
		const result = await validationDayValidityHandler(
			dayValidityId,
			idPlacement
		);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const refuseDayValidity = async (req, res) => {
	const { dayValidityId, idPlacement } = req.params;
	try {
		const result = await refuseDayValidityHandler(dayValidityId, idPlacement);
		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const fetchAllDayDumpByFreelance = async (req, res) => {
	const { idEntreprise } = req.params;
	try {
		const result = await fetchAllDayDumpByFreelanceHandler(idEntreprise);
		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export {
	updatedCompanyUser,
	fetchAllFreelancer,
	deleteOnePlacementInThisCompany,
	validationDayValidity,
	refuseDayValidity,
	fetchAllDayDumpByFreelance,
};
