import mongoose from "mongoose";
import moment from "moment";
import DayValidity from "../models/dayValidity.js";

class DayValidityRepository {
	async createDayValidity(data) {
		try {
			const currentDate = moment();
			if (currentDate.date() === 10) {
				throw new Error(
					"La création du DayDump est possible uniquement le 9e jour du mois."
				);
			}
			const existingDayValidity = await DayValidity.findOne({
				idPlacement: data.idPlacement,
				createdAt: {
					$gte: moment().startOf("month"),
					$lt: moment().endOf("month"),
				},
			});

			if (existingDayValidity) {
				throw new Error(
					"Un DayDump a déjà été créé ce mois-ci pour le placement en question."
				);
			}

			const dayValidity = new DayValidity(data);
			const savedDayValidity = await dayValidity.save();
			return savedDayValidity;
		} catch (error) {
			throw new Error(
				"Erreur lors de la création de jours travaillés : " + error.message
			);
		}
	}

	async getDayDumpInThisMonthByPlacementId(placementId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(placementId)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}

			const dayDump = await DayValidity.findOne({
				idPlacement: placementId,
				createdAt: {
					$gte: moment().startOf("month"),
					$lt: moment().endOf("month"),
				},
			});

			return dayDump;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération du DayDump pour le placement : " +
					error.message
			);
		}
	}

	async getDayDumpInByPlacementId(placementId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(placementId)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}

			const dayDump = await DayValidity.find({
				idPlacement: placementId,
			});

			return dayDump;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération du DayDump pour le placement : " +
					error.message
			);
		}
	}

	async dayValiditing(idDayValidity, idPlacement) {
		try {
			if (!mongoose.Types.ObjectId.isValid(idDayValidity)) {
				throw new Error("L'identifiant du jours n'est pas valide.");
			}
			if (!mongoose.Types.ObjectId.isValid(idPlacement)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}
			const existingDayValidity = await DayValidity.find({
				_id: idDayValidity,
				idPlacement: idPlacement,
			});
			if (!existingDayValidity) {
				throw new Error("Le jours a valider est introuvable");
			}

			const dayDump = existingDayValidity[0];

			dayDump.isValid = "valid";

			await dayDump.save();

			return dayDump;
		} catch (error) {
			throw new Error("Erreur de la validation de jours" + error.message);
		}
	}

	async dayRefusing(idDayValidity, idPlacement) {
		try {
			if (!mongoose.Types.ObjectId.isValid(idDayValidity)) {
				throw new Error("L'identifiant du jours n'est pas valide.");
			}
			if (!mongoose.Types.ObjectId.isValid(idPlacement)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}

			const existingDayValidity = await DayValidity.find({
				_id: idDayValidity,
				idPlacement: idPlacement,
			});

			if (!existingDayValidity) {
				throw new Error("Le jours a valider est introuvable");
			}

			const dayDump = existingDayValidity[0];

			dayDump.isValid = "notValid";

			await dayDump.save();

			return dayDump;
		} catch (error) {
			throw new Error("Erreur de la validation de jours" + error.message);
		}
	}

	async getDayValidityForPlacements(placementArray) {
		try {
			const placementIds = placementArray.map((placement) => placement._id);
			const validPlacementIds = placementIds.filter((id) =>
				mongoose.Types.ObjectId.isValid(id)
			);

			if (validPlacementIds.length === 0) {
				throw new Error("Aucun identifiant de placement valide fourni.");
			}

			const dayValidities = await DayValidity.find({
				placement: { $in: validPlacementIds },
			});

			return dayValidities;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération des DayValidity pour les placements : " +
					error.message
			);
		}
	}
}

export default DayValidityRepository;
