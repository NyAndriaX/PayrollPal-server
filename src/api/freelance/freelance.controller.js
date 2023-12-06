import {
	depositDayValidityHandler,
	fetchDayValidityInThisMonthByPlacementIdhandler,
	fetchPlacementToStockThisFreelanceService,
	fetchDayValidityByPlacementIdHandler,
	updatedFreelanceUserHandler,
} from "./freelance.handler.js";
import {
	DayValidityValidation,
	FreelanceSignupValidation,
} from "./freelance.validation.js";
import {
	DayValidityValidationMessages,
	freelanceValidationSignupMessage,
} from "./freelance.errors_message.js";
import { validation } from "./freelance.utils.js";

const updatedFreelanceUser = async (req, res) => {
	const { userId } = req.params;
	const userData = req.body;
	try {
		const errorMessage = await validation(
			userData,
			FreelanceSignupValidation,
			freelanceValidationSignupMessage
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const result = await updatedFreelanceUserHandler(userId, userData);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const depositDayValidity = async (req, res) => {
	const data = req.body;
	try {
		const errorMessage = await validation(
			req,
			DayValidityValidation,
			DayValidityValidationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const TotalARegler = data.tjm * data.nbrDeJours;

		data.TotalARegler = TotalARegler;

		const result = await depositDayValidityHandler(data);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const fetchDayValidityInThisMonthByPlacementId = async (req, res) => {
	const { placementId } = req.params;
	try {
		const result = await fetchDayValidityInThisMonthByPlacementIdhandler(
			placementId
		);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const fetchDayValidityByPlacementId = async (req, res) => {
	const { placementId } = req.params;
	try {
		const result = await fetchDayValidityByPlacementIdHandler(placementId);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const fetchPlacementToStockThisFreelance = async (req, res) => {
	const { idFreelance } = req.params;
	try {
		const result = await fetchPlacementToStockThisFreelanceService(idFreelance);
		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export {
	depositDayValidity,
	fetchDayValidityInThisMonthByPlacementId,
	fetchPlacementToStockThisFreelance,
	fetchDayValidityByPlacementId,
	updatedFreelanceUser,
};
