import dotenv from "dotenv";
dotenv.config();

const config = {
	database_url: process.env.DATABASE_URL,
	fallBack_url: process.env.FALLBACK,
	jwt_token: process.env.JWT_SECRET_KEY,
	email_user: process.env.EMAIL_USER,
	email_password: process.env.EMAIL_PASSWORD,
};

export default config;
