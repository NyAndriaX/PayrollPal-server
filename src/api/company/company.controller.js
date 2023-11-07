import { validationAuth } from "../utils/index.js";
import { CompanyValidation } from "./company.validation.js";
import { validationMessages } from "../errors/index.js";
import {
	updatedCompanyUserHandler,
	fetchAllFreelanceHandler,
	deleteOnePlacementInThisCompanyHandler,
} from "./company.handler.js";

const updatedCompanyUser = async (req, res) => {
	const { userId } = req.params;
	const userData = req.body;
	try {
		const errorMessage = await validationAuth(
			req,
			CompanyValidation,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const result = await updatedCompanyUserHandler(userId, userData);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
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
		console.log(error);
		res.status(500).json({ Error: error.message });
	}
};

export {
	updatedCompanyUser,
	fetchAllFreelancer,
	deleteOnePlacementInThisCompany,
};
