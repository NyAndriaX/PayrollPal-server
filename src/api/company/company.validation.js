import { body } from "express-validator";

const CompanyValidation = [
	body("raisonSocial").isString().notEmpty(),
	body("adresseEntreprise").isString().notEmpty(),
	body("numeroIdentificationFiscale").isString().notEmpty(),
	body("nomRepresentant").isString().notEmpty(),
	body("prenomRepresentant").isString().notEmpty(),
	body("emailRepresentant").isString().notEmpty(),
	body("telRepresentant").isString().notEmpty(),
	body("adresseRepresentant").isString().notEmpty(),
];

export {  CompanyValidation };
