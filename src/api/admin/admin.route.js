import { Router } from "express";
import {
	getAllUsers,
	deleteUsers,
	getAllUsersCompany,
	getAllUsersFreelance,
	getUnvalidatedFreelancers,
	validateFreelancers,
	deleteFreelWait,
	createPlacement,
	updatePlacement,
	deletePlacement,
	getPlacement,
	updatedProfil,
	createNewCompany,
} from "./admin.controller.js";

const adminRoute = Router();

/**
 * @swagger
 * paths:
 *   /api/admin/user/all-users:
 *     get:
 *       summary: Prendre toutes les utilisateurs
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie la liste de tous les utilisateurs
 */
adminRoute.get("/user/all-users", getAllUsers);
/**
 * @swagger
 * paths:
 *   /api/admin/user/all-users/:userId/:userRoles:
 *     delete:
 *       summary: Effacer un utilisateur
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, suppréssion reussie
 */
adminRoute.delete("/user/all-users/:userId/:userRoles", deleteUsers);
/**
 * @swagger
 * paths:
 *   /api/admin/user/freelance-user:
 *     get:
 *       summary: Prendre toutes les utilisateurs freelanceur
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie la liste de tous les utilisateurs freelanceur
 */
adminRoute.get("/user/freelance-user", getAllUsersFreelance);
/**
 * @swagger
 * paths:
 *   /api/admin/user/company-user:
 *     get:
 *       summary: Prendre toutes les utilisateurs company
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie la liste de tous les utilisateurs company
 */
adminRoute.get("/user/company-user", getAllUsersCompany);
/**
 * @swagger
 * paths:
 *   /api/admin/user/unvalidated-freelancers:
 *     get:
 *       summary: Prendre toutes les utilisateurs
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie la liste de tous les utilisateurs freelancer qui n sont pas valider
 */
adminRoute.get("/user/unvalidated-freelancers", getUnvalidatedFreelancers);
/**
 * @swagger
 * paths:
 *   /api/admin/user/unvalidated-freelancers/:userId:
 *     get:
 *       summary: Valider cet utilisateur freelancers
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie l'utilisateurs freelancer avec status valider
 */
adminRoute.get("/user/unvalidated-freelancers/:userId", validateFreelancers);
/**
 * @swagger
 * paths:
 *   /api/admin/user/unvalidated-freelancers/:userId:
 *     delete:
 *       summary: Refuser cet utilisateur freelancers
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, OK
 */
adminRoute.delete("/user/unvalidated-freelancers/:userId", deleteFreelWait);
/**
 * @swagger
 * paths:
 *   /api/admin/placement:
 *     post:
 *       summary:
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie de la configuration du placement
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Placement'
 * components:
 *   schemas:
 *     Placement:
 *       type: object
 *       properties:
 *         idFreelance:
 *           type: string
 *           required: true
 *         idFreelanceChasseur:
 *           type: string
 *           required: true
 *         idEntreprise:
 *           type: string
 *           required: true
 *         revenuMensuelFreelanceChasseur:
 *           type: string
 *           required: true
 */
adminRoute.post("/placement", createPlacement);
/**
 * @swagger
 * paths:
 *   /api/admin/placement/:placementId:
 *     put:
 *       summary:
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie de la configuration du placement
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Placement'
 * components:
 *   schemas:
 *     Placement:
 *       type: object
 *       properties:
 *         idFreelance:
 *           type: string
 *           required: true
 *         idFreelanceChasseur:
 *           type: string
 *           required: true
 *         idEntreprise:
 *           type: string
 *           required: true
 *         revenuMensuelFreelanceChasseur:
 *           type: string
 *           required: true
 */
adminRoute.put("/placement/:placementId", updatePlacement);
/**
 * @swagger
 * paths:
 *   /api/admin/placement/:placementId:
 *     delete:
 *       summary: Supprimer un placement via a son ID
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie OK
 */
adminRoute.delete("/placement/:placementId", deletePlacement);

/**
 * @swagger
 * paths:
 *   /api/admin/placement:
 *     get:
 *       summary: Prendre toutes les placement
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, renvoie toutes l'ensemble de placement
 */
adminRoute.get("/placement", getPlacement);
/**
 * @swagger
 * paths:
 *   /api/admin/settings:
 *     post:
 *       summary:
 *       tags:
 *         - Admin
 *       responses:
 *         '200':
 *           description: Succès, Enregistrement avec succés
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           required: true
 *         nom:
 *           type: string
 *           required: true
 *         prenom:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         roles:
 *           type: string
 *           required: true
 */
adminRoute.post("/settings", updatedProfil);
/**
 * @swagger
 * paths:
 *   /api/admin/company:
 *     post:
 *       summary:
 *       tags:
 *         - Admin
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
adminRoute.post("/company", createNewCompany);

export default adminRoute;
