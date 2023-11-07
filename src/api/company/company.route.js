import { Router } from "express";
import {
	updatedCompanyUser,
	fetchAllFreelancer,
	deleteOnePlacementInThisCompany,
} from "./company.controller.js";

const companyRoute = Router();
/**
 * @swagger
 * paths:
 *   /api/company/settings/:userId:
 *     post:
 *       summary:
 *       tags:
 *         - Company
 *       responses:
 *         '200':
 *           description: Succès, Enregistrement avec succés
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/company'
 * components:
 *   schemas:
 *     company:
 *       type: object
 *       properties:
 *         raisonSocial:
 *           type: string
 *           required: true
 *         adresseEntreprise:
 *           type: string
 *           required: true
 *         numeroIdentificationFiscale:
 *           type: string
 *           required: true
 *         nomRepresentant:
 *           type: string
 *           required: true
 *         prenomRepresentant:
 *           type: string
 *           required: true
 *         emailRepresentant:
 *           type: string
 *           required: true
 *         telRepresentant:
 *           type: string
 *           required: true
 *         adresseRepresentant:
 *           type: string
 *           required: true
 */
companyRoute.post("/settings/:userId", updatedCompanyUser);

/**
 * @swagger
 * paths:
 *   /api/company/all-freelancers/:idEntreprise:
 *     get:
 *       summary: Prendre toutes les freelancers
 *       tags:
 *         - Company
 *       responses:
 *         '200':
 *           description: Succès, renvoie la liste de tous les freelancers
 */
companyRoute.get("/all-freelancers/:idEntreprise", fetchAllFreelancer);
/**
 * @swagger
 * paths:
 *   /api/company/freelancer/:idEntreprise/:idFreelance:
 *     delete:
 *       summary: Effacer un utilisateur
 *       tags:
 *         - Company
 *       responses:
 *         '200':
 *           description: Succès, OK
 */
companyRoute.delete(
	"/freelancer/:idEntreprise/:idFreelance",
	deleteOnePlacementInThisCompany
);

export default companyRoute;
