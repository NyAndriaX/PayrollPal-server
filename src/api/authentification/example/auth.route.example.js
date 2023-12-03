import { Router } from "express";
import {
	signupForCompany,
	signupForFreelancer,
	signupForAdmin,
	validationEmail,
	findUserByEmail,
	login,
} from "./auth/auth.controller.example.js";

const authentificationRoute = Router();
/**
 * @swagger
 * paths:
 *   /api/auth/signup/company:
 *     post:
 *       summary: Inscription d'un utilisateur avec du role entreprise
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       responses:
 *         '200':
 *           description: Inscription terminé
 * components:
 *   schemas:
 *     Entreprise:
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
 *         password:
 *           type: string
 *           required: true
 *         isPasswordConfirmed:
 *           type: string
 *           required: true
 */

authentificationRoute.post("/signup/company", signupForCompany);
/**
 * @swagger
 * paths:
 *   /api/auth/signup/freelance:
 *     post:
 *       summary: Inscription d'un utilisateur avec le rôle freelance
 *       tags:
 *         - Authentification
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
authentificationRoute.post("/signup/freelance", signupForFreelancer);
/**
 * @swagger
 * paths:
 *   /api/auth/signup/admin:
 *     post:
 *       summary: Inscription d'un utilisateur avec du role admin
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       responses:
 *         '200':
 *           description: Inscription terminé
 * components:
 *   schemas:
 *     Admin:
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
 *         password:
 *           type: string
 *           required: true
 */

authentificationRoute.post("/signup/admin", signupForAdmin);
/**
 * @swagger
 * paths:
 *   /api/auth/signup/validation_email:
 *     post:
 *       summary: Validation d'email de toutes les utilisateur passe par ici
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Validation_Email'
 *       responses:
 *         '200':
 *           description: Validation terminé
 * components:
 *   schemas:
 *     Validation_Email:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 */

authentificationRoute.post("/signup/validation_email", validationEmail);
/**
 * @swagger
 * paths:
 *   /api/auth/login/checkedEmail:
 *     post:
 *       summary: vérification d'email
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginCheckedEmail'
 *       responses:
 *         '200':
 *           description: donner d'utilisateur
 * components:
 *   schemas:
 *     LoginCheckedEmail:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 */

authentificationRoute.post("/login/checkedEmail", findUserByEmail);
/**
 * @swagger
 * paths:
 *   /api/auth/login/checkedPassword:
 *     post:
 *       summary: Vérification du mot de passe
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/checkedPassword'
 *       responses:
 *         '200':
 *           description: Inscription terminé
 * components:
 *   schemas:
 *     checkedPassword:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 */

authentificationRoute.post("/login/checkedPassword", login);

export default authentificationRoute;
