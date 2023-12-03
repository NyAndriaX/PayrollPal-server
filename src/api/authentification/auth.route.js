import { Router } from "express";
import {
	signupForFreelancer,
	signupForCompany,
	signupForAdmin,
	login,
	isEmailValid,
	isEmailAvailable,
	doesEmailExist,
	resetPassword,
	validateResetToken,
	generateAndSendResetToken,
	resendValidationCode,
} from "./auth.controller.js";

const authentificationRoute = Router();

/**
 * @swagger
 * paths:
 *   /api/auth/signup/freelancer:
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
 *           required: true
 *         codePostal:
 *           type: string
 *           required: true
 *         adresse:
 *           type: string
 *           required: true
 *         poste:
 *           type: string
 *           required: true
 *         nif:
 *           type: string
 *           required: true
 *         iban:
 *           type: string
 *           required: true
 *         bic:
 *           type: string
 *           required: true
 *         banque:
 *           type: string
 *           required: true
 *         cin:
 *           type: string
 *           required: true
 *         isAcceptedContract:
 *           type: boolean
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         isPasswordConfirmed:
 *           type: string
 *           required: true
 */
authentificationRoute.post("/signup/freelancer", signupForFreelancer);

/**
 * @swagger
 * paths:
 *   /api/auth/signup/company:
 *     post:
 *       summary: Inscription d'un utilisateur avec le rôle entreprise
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       responses:
 *         '200':
 *           description: Inscription terminée
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         representantNom:
 *           type: string
 *           required: true
 *         representantPrenom:
 *           type: string
 *           required: true
 *         representantEmail:
 *           type: string
 *           required: true
 *         representantTel:
 *           type: string
 *           required: true
 *         representantCodePostal:
 *           type: string
 *           required: true
 *         representantAdresse:
 *           type: string
 *           required: true
 *         representantVille:
 *           type: string
 *           required: true
 *         raisonSocial:
 *           type: string
 *           required: true
 *         entrepriseVille:
 *           type: string
 *           required: true
 *         entrepriseAdresse:
 *           type: string
 *           required: true
 *         entrepriseCodePostal:
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
 *   /api/auth/signup/admin:
 *     post:
 *       summary: Inscription d'un utilisateur avec le rôle administrateur
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       responses:
 *         '200':
 *           description: Inscription terminée
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         adminNom:
 *           type: string
 *           required: true
 *         adminPrenom:
 *           type: string
 *           required: true
 *         adminEmail:
 *           type: string
 *           required: true
 *         adminTel:
 *           type: string
 *           required: true
 *         adminCodePostal:
 *           type: string
 *           required: true
 *         adminAdresse:
 *           type: string
 *           required: true
 *         adminVille:
 *           type: string
 *           required: true
 *         adminRole:
 *           type: string
 *           required: true
 *         adminPassword:
 *           type: string
 *           required: true
 *         isAdminPasswordConfirmed:
 *           type: string
 *           required: true
 */
authentificationRoute.post("/signup/admin", signupForAdmin);

/**
 * @swagger
 * paths:
 *   /api/auth/login:
 *     post:
 *       summary: Connexion d'un utilisateur
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       responses:
 *         '200':
 *           description: Connexion réussie
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 */
authentificationRoute.post("/login", login);
/**
 * @swagger
 * paths:
 *   /api/auth/isEmailValid:
 *     post:
 *       summary: Valider un email
 *       description: Cette route est utilisée pour valider un email.
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationEmail'
 *       responses:
 *         '200':
 *           description: Email valide
 *         '400':
 *           description: Mauvaise requête - Vérifiez le format de l'email
 * components:
 *   schemas:
 *     ValidationEmail:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         token:
 *           type: string
 *           required: true
 *       example:
 *         email: john.doe@example.com
 *         token: abcdef123456
 */
authentificationRoute.post("/isEmailValid", isEmailValid);

/**
 * @swagger
 * paths:
 *   /api/auth/:email/availability:
 *     get:
 *       summary: Vérifier la disponibilité d'une adresse e-mail
 *       tags:
 *         - Authentification
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         '200':
 *           description: Disponibilité vérifiée
 */
authentificationRoute.get("/:email/availability", isEmailAvailable);

/**
 * @swagger
 * paths:
 *   /api/auth/:email/existence:
 *     get:
 *       summary: Vérifier l'existence d'une adresse e-mail
 *       tags:
 *         - Authentification
 *       parameters:
 *         - in: query
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         '200':
 *           description: Existence vérifiée
 */
authentificationRoute.get("/:email/existence", doesEmailExist);
/**
 * @swagger
 * paths:
 *   /api/auth/:email/resend-validation-code:
 *     get:
 *       summary: Renvoyer le code de validation pour un utilisateur spécifique
 *       tags:
 *         - Authentification
 *       parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: L'adresse e-mail de l'utilisateur pour lequel renvoyer le code de validation
 *       responses:
 *         '200':
 *           description: Code de validation renvoyé avec succès
 *         '400':
 *           description: Erreur de requête - Vérifiez le format de l'e-mail
 *         '500':
 *           description: Erreur interne du serveur
 */
authentificationRoute.get(
	"/:email/resend-validation-code",
	resendValidationCode
);
/**
 * @swagger
 * paths:
 *   /api/auth/reset-password:
 *     post:
 *       summary: Réinitialiser le mot de passe pour un utilisateur
 *       description: Réinitialise le mot de passe pour un utilisateur avec un token de réinitialisation.
 *       tags:
 *         - Authentification
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPassword'
 *       responses:
 *         '200':
 *           description: Mot de passe réinitialisé avec succès
 *         '400':
 *           description: Mauvaise requête - Vérifiez le token de réinitialisation
 *         '500':
 *           description: Erreur interne du serveur
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         token:
 *           type: string
 *           required: true
 *         newPassword:
 *           type: string
 *           required: true
 */
authentificationRoute.post("/reset-password", resetPassword);

/**
 * @swagger
 * paths:
 *   /api/auth/validate-reset-token/:token:
 *     get:
 *       summary: Valider un token de réinitialisation du mot de passe
 *       description: Valide un token de réinitialisation du mot de passe pour un utilisateur.
 *       tags:
 *         - Authentification
 *       parameters:
 *         - in: path
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: Le token de réinitialisation du mot de passe
 *       responses:
 *         '200':
 *           description: Token de réinitialisation valide
 *         '400':
 *           description: Token de réinitialisation invalide ou expiré
 *         '500':
 *           description: Erreur interne du serveur
 */
authentificationRoute.get("/validate-reset-token/:token", validateResetToken);
/**
 * @swagger
 * paths:
 *   /api/auth/generate-reset-token/:email:
 *     get:
 *       summary: Générer un token de réinitialisation du mot de passe
 *       description: Génére un token de réinitialisation du mot de passe pour un utilisateur.
 *       tags:
 *         - Authentification
 *       parameters:
 *         - in: path
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: Le token de réinitialisation du mot de passe
 *       responses:
 *         '200':
 *           description: Token de réinitialisation valide
 *         '400':
 *           description: Token de réinitialisation invalide ou expiré
 *         '500':
 *           description: Erreur interne du serveur
 */
authentificationRoute.get(
	"/generate-reset-token/:email",
	generateAndSendResetToken
);

export default authentificationRoute;
