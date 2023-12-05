import { body } from "express-validator";

const adminValidateSignup = [
	body("nom").isString().notEmpty(),
	body("prenom").isString().notEmpty(),
	body("email").isEmail().notEmpty(),
	body("password").isString().notEmpty().isLength({ min: 8 }).matches(/\d/),
];

const placementValidateData = [
	body("idFreelance").isString().notEmpty(),
	body("idFreelanceChasseur").isString().notEmpty(),
	body("idEntreprise").isString().notEmpty(),
	body("tjm").isString().notEmpty(),
];

const CompanyVaidationInAdmin = [
	body("raisonSocial").isString().notEmpty(),
	body("adresseEntreprise").isString().notEmpty(),
	body("numeroIdentificationFiscale").isString().notEmpty(),
	body("nomRepresentant").isString().notEmpty(),
	body("prenomRepresentant").isString().notEmpty(),
	body("emailRepresentant").isString().notEmpty(),
	body("telRepresentant").isString().notEmpty(),
	body("adresseRepresentant").isString().notEmpty(),
];

export { placementValidateData, CompanyVaidationInAdmin, adminValidateSignup };
