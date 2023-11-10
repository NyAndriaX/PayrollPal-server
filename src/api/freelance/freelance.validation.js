import { body } from "express-validator";

const DayValidityValidation = [
	body("idPlacement").isString().notEmpty(),
	body("nbrDeJours").isInt({ min: 0 }).notEmpty(),
	body("tjm").isInt({ min: 0 }).notEmpty(),
];
const FreelanceValidation = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isString().notEmpty(),
	body("tel").isString().notEmpty(),
	body("adresse").isString().notEmpty(),
	body("informationsBancaires").custom((value) => {
		if (typeof value !== "object" || value === null) {
			throw new Error("Les informations bancaires doivent être un objet.");
		}
		if (!value.IBAN || !value.BIC || !value.nomTitulaire) {
			throw new Error(
				"Les informations bancaires doivent contenir IBAN, BIC et nomTitulaire."
			);
		}
		return true;
	}),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
];

export { DayValidityValidation, FreelanceValidation };
