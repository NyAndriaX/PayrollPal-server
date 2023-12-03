import { body } from "express-validator";

const validateAdminSignup = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isEmail().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
];

const validateFreelancerSignup = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isString().notEmpty(),
	body("tel").isString().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
	body("isPasswordConfirmed").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error(
				"La confirmation du mot de passe ne correspond pas au mot de passe."
			);
		}
		return true;
	}),
];

const validateEntrepriseSignup = [
	body("raisonSocial").isString().notEmpty(),
	body("adresseEntreprise").isString().notEmpty(),
	body("numeroIdentificationFiscale").isString().notEmpty(),
	body("nomRepresentant").isString().notEmpty(),
	body("prenomRepresentant").isString().notEmpty(),
	body("emailRepresentant").isString().notEmpty(),
	body("telRepresentant").isString().notEmpty(),
	body("adresseRepresentant").isString().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
	body("isPasswordConfirmed").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error(
				"La confirmation du mot de passe ne correspond pas au mot de passe."
			);
		}
		return true;
	}),
];

export {
	validateAdminSignup,
	validateFreelancerSignup,
	validateEntrepriseSignup,
};
