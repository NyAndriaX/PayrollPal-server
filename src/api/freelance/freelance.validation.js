import { body } from "express-validator";

const DayValidityValidation = [
	body("idPlacement").isString().notEmpty(),
	body("nbrDeJours").isInt({ min: 0 }).notEmpty(),
	body("tjm").isInt({ min: 0 }).notEmpty(),
];
const FreelanceSignupValidation = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isEmail().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
	body("tel").isString().notEmpty(),
	body("ville").isString().notEmpty(),
	body("adresse").isString().notEmpty(),
	body("codePostal").isString().notEmpty(),
	body("poste").isString().notEmpty(),
	body("nif")
		.isString()
		.notEmpty()
		.matches(/^[0-9]{13}$/),
	// body("iban")
	// 	.isString()
	// 	.notEmpty()
	// 	.custom((value) => {
	// 		const cleanedIBAN = value.replace(/\s/g, "");
	// 		return IBAN.isValidIBAN(cleanedIBAN);
	// 	}),
	body("bic")
		.isString()
		.notEmpty()
		.matches(/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/),
	body("banque").isString().notEmpty(),
];
export { DayValidityValidation, FreelanceSignupValidation };
