import nodemailer from "nodemailer";
import { config } from "../config/index.js";

const sendValidationEmail = async (email, token) => {
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
			subject: "Code de validation d'email",
			text: `Voici votre code de validation d'email sur PayrollPal ${token}.`,
		};

		const info = await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error("Erreur lors de l'envoi de l'e-mail de confirmation.");
	}
};

export { sendValidationEmail };
