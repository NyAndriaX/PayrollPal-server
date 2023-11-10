import mongoose from "mongoose";

const dayValiditySchema = new mongoose.Schema({
	idPlacement: {
		type: String,
		required: true,
	},
	isValid: {
		type: String,
		required: true,
		default: "waiting", //valid/notValid
	},
	nbrDeJours: {
		type: Number,
		required: true,
	},
	TotalARegler: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const DayValidity = mongoose.model("DayValidity", dayValiditySchema);

export default DayValidity;
