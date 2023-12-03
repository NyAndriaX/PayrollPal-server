import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	representantNom: {
		type: String,
		required: true,
	},
	representantPrenom: {
		type: String,
		required: true,
	},
	representantCodePostal: {
		type: String,
		required: true,
	},
	representantAdresse: {
		type: String,
		required: true,
	},
	representantVille: {
		type: String,
		required: true,
	},
	representantEmail: {
		type: String,
		required: true,
	},
	representantTel: {
		type: String,
		required: true,
	},
	raisonSocial: {
		type: String,
		required: true,
	},
	entrepriseVille: {
		type: String,
		required: true,
	},
	entrepriseAdresse: {
		type: String,
		required: true,
	},
	entrepriseCodePostal: {
		type: String,
		required: true,
	},
	isEmailConfirmed: {
		type: Boolean,
		required: true,
		default: false,
	},
	emailVerificationCode: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	resetPasswordToken: {
		type: String,
		required: false,
	},

	resetPasswordExpires: {
		type: Date,
		required: false,
	},
	roles: {
		type: String,
		required: true,
		default: "ROLES_COMPANY",
	},
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const UserEntreprise = mongoose.model("UserEntreprise", userSchema);

export default UserEntreprise;
