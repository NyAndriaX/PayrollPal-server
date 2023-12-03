import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	prenom: {
		type: String,
		required: true,
	},
	email: {
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
	adminValidate: {
		type: Boolean,
		required: true,
		default: false,
	},
	ville: {
		type: String,
		required: true,
	},
	adresse: {
		type: String,
		required: true,
	},
	codePostal: {
		type: String,
		required: true,
		default: "",
	},
	nif: {
		type: String,
		required: true,
		default: "",
	},
	poste: {
		type: String,
		required: true,
	},
	iban: {
		type: String,
		required: true,
		default: "",
	},
	bic: {
		type: String,
		required: true,
	},
	banque: {
		type: String,
		required: true,
	},
	tel: {
		type: String,
		required: true,
	},
	cin: {
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
	isAcceptedContract: {
		type: Boolean,
		required: true,
		default: false,
	},
	roles: {
		type: String,
		required: true,
		default: "ROLES_FREELANCE",
	},
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const UserFreelancer = mongoose.model("UserFreelancer", userSchema);

export default UserFreelancer;
