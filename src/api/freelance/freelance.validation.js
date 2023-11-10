import { body } from "express-validator";

const DayValidityValidation = [
	body("idPlacement").isString().notEmpty(),
	body("nbrDeJours").isInt({ min: 0 }).notEmpty(),
	body("tjm").isInt({ min: 0 }).notEmpty(),
];

export { DayValidityValidation };
