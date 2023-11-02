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
	adminValidate: {
		type: Boolean,
		required: true,
		default: false,
	},
	emailVerificationCode: {
		type: String,
		required: true,
	},
	confirmationToken: {
		type: Number,
		required: true,
		default: 24 * 60 * 60 * 1000,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
	},
	tel: {
		type: String,
		required: true,
	},
	adresse: {
		type: String,
		required: true,
	},
	dateDeNaissance: {
		type: String,
		required: true,
	},
	informationsBancaires: {
		type: {
			IBAN: String,
			BIC: String,
			nomTitulaire: String,
		},
		required: true,
	},
	reseauProfessionnel: {
		type: [String],
		required: false,
	},
	password: {
		type: String,
		required: true,
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
