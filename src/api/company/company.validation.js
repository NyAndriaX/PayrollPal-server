import { body } from "express-validator";

const CompanyValidation = [
	body("raisonSocial").isString().notEmpty(),
	body("entrepriseAdresse").isString().notEmpty(),
	body("entrepriseVille").isString().notEmpty(),
	body("entrepriseAdresse").isString().notEmpty(),
	body("entrepriseCodePostal").isString().notEmpty(),
	body("representantNom").isString().notEmpty(),
	body("representantPrenom").isString().notEmpty(),
	body("representantEmail").isString().notEmpty(),
	body("representantTel").isString().notEmpty(),
	body("representantAdresse").isString().notEmpty(),
	body("representantCodePostal").isString().notEmpty(),
	body("representantVille").isString().notEmpty(),
];

export { CompanyValidation };
