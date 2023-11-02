import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	raisonSocial: {
		type: String,
		required: true,
	},
	adresseEntreprise: {
		type: String,
		required: true,
	},
	numeroIdentificationFiscale: {
		type: String,
		required: true,
	},
	nomRepresentant: {
		type: String,
		required: true,
	},
	prenomRepresentant: {
		type: String,
		required: true,
	},
	emailRepresentant: {
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
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
	},
	telRepresentant: {
		type: String,
		required: true,
	},
	adresseRepresentant: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
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
