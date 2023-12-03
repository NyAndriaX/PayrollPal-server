import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./index.js";
import apiRoutes from "../api/index.js";
import UserEntreprise from "../databases/models/user_Entreprise.js";
import UserFreelancer from "../databases/models/user_Freelancer.js";
import {
	deleteAutoAccountsForCompany,
	deleteAutoAccountsForFreelancer,
} from "../api/utils/index.js";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const destinationPath = path.join(__dirname, "../public", "cin");
		cb(null, destinationPath);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 25 * 1024 * 1024,
	},
	fileFilter: async function (req, file, cb) {
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Le fichier doit être une image."));
		} else {
			cb(null, true);
		}
	},
});

const configureApp = (app) => {
	app.disable("x-powered-by");

	app.use((req, res, next) => {
		upload.single("cin")(req, res, function (err) {
			if (err) {
				if (req.file) {
					const filePath = req.file.path;
					fs.unlink(filePath, (unlinkErr) => {
						if (unlinkErr) {
							throw new Error(
								"une erreur est survenue lors de cet enregistrement"
							);
						}
					});
				}
				return res.status(400).send({ message: err.message });
			}
			next();
		});
	});

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(bodyParser.json());

	app.use(cors());

	app.use("/api", apiRoutes);

	mongoose.connect(config.database_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	setInterval(() => {
		deleteAutoAccountsForCompany(UserEntreprise);
		deleteAutoAccountsForFreelancer(UserFreelancer);
	}, 86400000);
};

export default configureApp;
