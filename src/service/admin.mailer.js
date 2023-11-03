import nodemailer from "nodemailer";
import { config } from "../config/index.js";

const sendCodeAndHTTPInValidationMailForNewAccountCompany = async (
	email,
	password,
	token
) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp-mail.outlook.com",
			port: 587,
			secure: false,
			auth: {
				user: config.email_user,
				pass: config.email_password,
			},
			tls: {
				ciphers: "SSLv3",
			},
		});

		const mailOptions = {
			from: config.email_user,
			to: email,
			subject: "Creation de compte sur le PayrollPay",
			text: `Votre compte a été creer sur le placetform PayrollPal avec un mot de passe ${password}. Pour confirmer votre email veullier cliquer sur cet lien ${
				config.fallBack_url + "/signup/confirmation_email/" + email
			} sur le code de validation ${token}`,
		};

		const info = await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error("Erreur lors de l'envoi de l'e-mail de confirmation.");
	}
};
const sendCodeAndHTTPInValidationMailForUpdateCompany = async (
	email,
	token
) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp-mail.outlook.com",
			port: 587,
			secure: false,
			auth: {
				user: config.email_user,
				pass: config.email_password,
			},
			tls: {
				ciphers: "SSLv3",
			},
		});

		const mailOptions = {
			from: config.email_user,
			to: email,
			subject: "Modification de compte sur le PayrollPay",
			text: `Cet Email a été chécker pour faire une modification du paramétre d'un compte company sur le placetform PayrollPal. Pour confirmer votre email veullier cliquer sur cet lien ${
				config.fallBack_url + "/signup/confirmation_email/" + email
			} sur le code de validation ${token}`,
		};

		const info = await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error("Erreur lors de l'envoi de l'e-mail de confirmation.");
	}
};

export {
	sendCodeAndHTTPInValidationMailForNewAccountCompany,
	sendCodeAndHTTPInValidationMailForUpdateCompany,
};
