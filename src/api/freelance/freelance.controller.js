import {
	depositDayValidityHandler,
	fetchDayValidityWidthPlacementIdhandler,
	fetchPlacementToStockThisFreelanceService,
	updatedFreelanceUserHandler,
} from "./freelance.handler.js";
import {
	DayValidityValidation,
	FreelanceValidation,
} from "./freelance.validation.js";
import { freelanceValidation } from "../utils/freelance.utils.js";
import { validationMessages } from "../errors/auth.message.js";

const updatedFreelanceUser = async (req, res) => {
	const { userId } = req.params;
	const userData = req.body;
	try {
		const errorMessage = await freelanceValidation(
			req,
			FreelanceValidation,
			validationMessages
		);

		if (errorMessage) {
			return res.status(400).json({ message: errorMessage });
		}

		const result = await updatedFreelanceUserHandler(userId, userData);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const depositDayValidity = async (req, res) => {
	const data = req.body;
	try {
		const errorMessage = await freelanceValidation(
			req,
			DayValidityValidation,
			validationMessages
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
		res.status(500).json({ Error: error.message });
	}
};

const fetchDayValidityWidthPlacementId = async (req, res) => {
	const { placementId } = req.params;
	try {
		const result = await fetchDayValidityWidthPlacementIdhandler(placementId);
		return res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const fetchPlacementToStockThisFreelance = async (req, res) => {
	const { idFreelance } = req.params;
	try {
		const result = await fetchPlacementToStockThisFreelanceService(idFreelance);
		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

export {
	depositDayValidity,
	fetchDayValidityWidthPlacementId,
	fetchPlacementToStockThisFreelance,
	updatedFreelanceUser,
};
