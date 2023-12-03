import { body } from "express-validator";
import IBAN from "ibantools";

const validateFreelanceSignup = [
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
	body("iban")
		.isString()
		.notEmpty()
		.custom((value) => {
			const cleanedIBAN = value.replace(/\s/g, "");
			return IBAN.isValidIBAN(cleanedIBAN);
		}),
	body("bic")
		.isString()
		.notEmpty()
		.matches(/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/),
	body("banque").isString().notEmpty(),
	body("isAcceptedContract").custom(
		(value) =>
			(value, { req }) =>
				value === true
	),
	body("isPasswordConfirmed").custom(
		(value, { req }) => value === req.body.password
	),
];

const validateCompanySignup = [
	body("representantNom").isString().notEmpty(),
	body("representantPrenom").isString().notEmpty(),
	body("representantEmail").isEmail().notEmpty(),
	body("representantTel").isString().notEmpty(),
	body("representantCodePostal").isString().notEmpty(),
	body("representantAdresse").isString().notEmpty(),
	body("representantVille").isString().notEmpty(),
	body("raisonSocial").isString().notEmpty(),
	body("entrepriseVille").isString().notEmpty(),
	body("entrepriseAdresse").isString().notEmpty(),
	body("entrepriseCodePostal").isString().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
	body("isPasswordConfirmed").custom(
		(value, { req }) => value === req.body.password
	),
];

const validateAdminSignup = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isEmail().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
	body("isPasswordConfirmed").custom(
		(value, { req }) => value === req.body.password
	),
];

export { validateFreelanceSignup, validateCompanySignup, validateAdminSignup };
