import nodemailer from "nodemailer";
import { config } from "../config/index.js";

const sendValidationEmailConfirmation = async (email, token) => {
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
			from: "Payrollpal <" + config.email_user + ">",
			to: email,
			subject: "Code de confirmation d'email",
			text: `Voici votre code de confirmation d'email sur PayrollPal ${token}.`,
		};

		const info = await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error("Erreur lors de l'envoi de l'e-mail de confirmation.");
	}
};

const sendResetPasswordByEmail = async (email, token) => {
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
			from: "Payrollpal <" + config.email_user + ">",
			to: email,
			subject: "Modification de mot de passe sur Payrollpal",
			text: `Voici votre code de confirmation d'email sur PayrollPal ${token} pour modifier votre mot de passe .`,
		};

		const info = await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
		throw new Error("Erreur lors de l'envoi de l'e-mail de confirmation.");
	}
};

export { sendValidationEmailConfirmation, sendResetPasswordByEmail };
