import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./index.js";
import apiRoutes from "../api/index.js";
import UserEntreprise from "../databases/models/user_Entreprise.js";
import UserFreelancer from "../databases/models/user_Freelancer.js";
import { removeUnverifiedAccounts } from "../api/utils/index.js";

const configureApp = (app) => {
	app.disable("x-powered-by");

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(bodyParser.json());

	app.use(cors());

	app.use("/api", apiRoutes);

	mongoose.connect(config.database_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	setInterval(() => {
		removeUnverifiedAccounts(UserEntreprise);
		removeUnverifiedAccounts(UserFreelancer);
	}, 86400000);
};

export default configureApp;
