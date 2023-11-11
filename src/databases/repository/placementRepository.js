import mongoose from "mongoose";
import Placement from "../models/placement.js";

class PlacementRepository {
	async createPlacement(placementData) {
		try {
			const { idFreelance } = placementData;

			const existingPlacement = await Placement.findOne({ idFreelance });

			if (existingPlacement) {
				throw new Error(
					"Cet idFreelance est déjà associé à un autre placement."
				);
			}

			const placement = new Placement(placementData);
			const savedPlacement = await placement.save();
			return savedPlacement;
		} catch (error) {
			throw new Error(
				"Erreur lors de la création du placement : " + error.message
			);
		}
	}
	async updatePlacement(placementId, placementData) {
		try {
			if (!mongoose.Types.ObjectId.isValid(placementId)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}

			const existingPlacement = await Placement.findById(placementId);

			if (!existingPlacement) {
				throw new Error("Placement introuvable.");
			}

			Object.assign(existingPlacement, placementData);
			const updatedPlacement = await existingPlacement.save();

			return updatedPlacement;
		} catch (error) {
			throw new Error(
				"Erreur lors de la modification du placement " + error.message
			);
		}
	}

	async getPlacementsByFreelanceId(idFreelance) {
		try {
			const placements = await Placement.find({ idFreelance });

			if (placements.length === 0) {
				throw new Error("Aucun placement trouvé pour cet idFreelance.");
			}

			return placements;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération des placements pour l'idFreelance : " +
					error.message
			);
		}
	}

	async getPlacementWidthIdEntreprise(idEntreprise) {
		try {
			if (!mongoose.Types.ObjectId.isValid(idEntreprise)) {
				throw new Error("L'identifiant du entreprise n'est pas valide.");
			}
			const placement = await Placement.find({
				idEntreprise,
			});
			return placement;
		} catch (error) {
			throw new Error(
				"Error lors de la chargement de toutes les freelancers dans une entreprise : " +
					error.message
			);
		}
	}

	async getPlacementWithId(placementId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(placementId)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}
			const placement = await Placement.findById(placementId);
			return placement;
		} catch (error) {
			throw new Error(
				"Erreur lors de la recherche via a l'identifiant" + error.message
			);
		}
	}
	async getAllPlacement() {
		try {
			const placements = await Placement.find();
			return placements;
		} catch (error) {
			throw new Error(
				"Erreur lors de la chargement de toutes l'ensemble de placement " +
					error.message
			);
		}
	}
	async getPlacementWidthIdFreelanceAndIdEntreprise(idFreelance, idEntreprise) {
		try {
			if (!mongoose.Types.ObjectId.isValid(idFreelance)) {
				throw new Error(
					"L'identifiant freelanceur du placement n'est pas valide."
				);
			}
			if (!mongoose.Types.ObjectId.isValid(idEntreprise)) {
				throw new Error(
					"L'identifiant entreprise du placement n'est pas valide."
				);
			}
			const placement = await Placement.find({
				idFreelance,
				idEntreprise,
			});
			return placement;
		} catch (error) {
			throw new Error(
				"Erreur lors de la recherche via a l'identifiant" + error.message
			);
		}
	}
	async getAllPlacement() {
		try {
			const placements = await Placement.find();
			return placements;
		} catch (error) {
			throw new Error(
				"Erreur lors de la chargement de toutes l'ensemble de placement " +
					error.message
			);
		}
	}
	async deletePlacement(placementId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(placementId)) {
				throw new Error("L'identifiant du placement n'est pas valide.");
			}
			const result = await Placement.findByIdAndDelete(placementId);
			if (!result) {
				throw new Error(
					"Aucun placement trouvé avec cet ID pour la suppression"
				);
			}
			return "Suppression reussi";
		} catch (error) {
			throw new Error(
				"Erreur lors de la chargement de toutes l'ensemble de placement " +
					error.message
			);
		}
	}
}

export default PlacementRepository;
