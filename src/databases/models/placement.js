import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
	idFreelance: {
		type: String,
		required: true,
	},
	idFreelanceChasseur: {
		type: String,
		required: true,
	},
	idEntreprise: {
		type: String,
		required: true,
	},
	tjm: {
		type: String,
		required: true,
	},
});

const Placement = mongoose.model("Placement", placementSchema);

export default Placement;
