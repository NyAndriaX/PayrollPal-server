import { body } from "express-validator";

const placementValidateData = [
	body("idFreelance").isString().notEmpty(),
	body("idFreelanceChasseur").isString().notEmpty(),
	body("idEntreprise").isString().notEmpty(),
	body("revenuMensuelFreelanceChasseur").isString().notEmpty(),
];

export { placementValidateData };
