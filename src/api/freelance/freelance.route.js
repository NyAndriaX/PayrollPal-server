import { Router } from "express";
import {
	depositDayValidity,
	fetchDayValidityWidthPlacementId,
	fetchPlacementToStockThisFreelance,
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

export default freelanceRoute;
