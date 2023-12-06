import { Router } from "express";
import {
	depositDayValidity,
	fetchDayValidityInThisMonthByPlacementId,
	fetchDayValidityByPlacementId,
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
 *       summary: Prendre le jours travaillé d'une placement ce mois ci
 *       tags:
 *         - Freelance
 *       responses:
 *         '200':
 *           description: Succès, le dayDump
 */
freelanceRoute.get(
	"/dayValidity/:placementId",
	fetchDayValidityInThisMonthByPlacementId
);
/**
 * @swagger
 * paths:
 *   /api/freelance/allDayValidity/:placementId:
 *     get:
 *       summary: Prendre toutes les jours travaillé d'une placement
 *       tags:
 *         - Freelance
 *       responses:
 *         '200':
 *           description: Succès, le dayDump
 */
freelanceRoute.get(
	"/allDayValidity/:placementId",
	fetchDayValidityByPlacementId
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
 *         tel:
 *           type: string
 *           required: true
 *         ville:
 *           type: string
 *           required: false
 *         codePostal:
 *           type: string
 *           required: false
 *         adresse:
 *           type: string
 *           required: false
 *         poste:
 *           type: string
 *           required: false
 *         nif:
 *           type: string
 *           required: false
 *         iban:
 *           type: string
 *           required: false
 *         bic:
 *           type: string
 *           required: false
 *         banque:
 *           type: string
 *           required: false
 *         password:
 *           type: string
 *           required: true
 *         isPasswordConfirmed:
 *           type: string
 *           required: true
 */
freelanceRoute.post("/settings/:userId", updatedFreelanceUser);

export default freelanceRoute;
