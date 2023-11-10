import { Router } from "express";
import {
	depositDayValidity,
	fetchDayValidityWidthPlacementId,
	fetchPlacementToStockThisFreelance,
	updatedFreelanceUser,
} from "./freelance.controller.js";

const freelanceRoute = Router();
/**
 * @swagger
 * paths:
 *   /api/freelance/depositDayValidity:
 *     post:
 *       summary:
 *       tags:
 *         - Freelance
 *       responses:
 *         '200':
 *           description: Succès, Enregistrement avec succés
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DayValidity'
 * components:
 *   schemas:
 *     DayValidity:
 *       type: object
 *       properties:
 *         idPlacement:
 *           type: string
 *           required: true
 *         nbrDeJours:
 *           type: string
 *           required: true
 */
freelanceRoute.post("/depositDayValidity", depositDayValidity);
/**
 * @swagger
 * paths:
 *   /api/freelance/dayValidity/:placementId:
 *     get:
 *       summary: Prendre le jours travaillé d'une placement
 *       tags:
 *         - Freelance
 *       responses:
 *         '200':
 *           description: Succès, le dayDump
 */
freelanceRoute.get(
	"/dayValidity/:placementId",
	fetchDayValidityWidthPlacementId
);
/**
 * @swagger
 * paths:
 *   /api/freelance/:idFreelance:
 *     get:
 *       summary: Prendre le placement ou il y a cet freelance
 *       tags:
 *         - Freelance
 *       responses:
 *         '200':
 *           description: Succès, return le placement
 */
freelanceRoute.get("/:idFreelance", fetchPlacementToStockThisFreelance);
/**
 * @swagger
 * paths:
 *   /api/freelance/settings/:userId:
 *     post:
 *       summary: Inscription d'un utilisateur avec le rôle freelance
 *       tags:
 *         - Freelance
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Freelancer'
 *       responses:
 *         '200':
 *           description: Inscription terminée
 * components:
 *   schemas:
 *     Freelancer:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           required: true
 *         prenom:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         adresse:
 *           type: string
 *           required: true
 *         dateDeNaissance:
 *           type: string
 *           required: true
 *         tel:
 *           type: string
 *           required: true
 *         informationsBancaires:
 *           type: object
 *           properties:
 *             IBAN:
 *               type: string
 *             BIC:
 *               type: string
 *             nomTitulaire:
 *               type: string
 *           required:
 *             - IBAN
 *             - BIC
 *             - nomTitulaire
 */
freelanceRoute.post("/settings/:userId", updatedFreelanceUser);

export default freelanceRoute;
