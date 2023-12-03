import CommonUserRepository from "./CommonUserRepository.js";
import UserFreelancer from "../models/user_Freelancer.js";
import bcrypt from "bcrypt";

class UserFreelancerRepository extends CommonUserRepository {
	constructor() {
		super(UserFreelancer);
	}

	async getFreelancerByEmail(email) {
		try {
			const freelancer = await this.model.findOne({ email });
			if (freelancer && !freelancer.adminValidate) {
				throw new Error(
					"Cet email doit encore être validé par l'administrateur. Veuillez patienter, s'il vous plaît."
				);
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de l'utilisateur Freelancer par email : ${error.message}`
			);
		}
	}

	async getAdminValidatedFreelancers() {
		try {
			return await this.model.find({
				adminValidate: true,
				isEmailConfirmed: true,
			});
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs validés par l'admin : ${error.message}`
			);
		}
	}

	async getAdminNotValidatedFreelancers() {
		try {
			return await this.model.find({
				adminValidate: false,
				isEmailConfirmed: true,
			});
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs non validés par l'admin : ${error.message}`
			);
		}
	}

	async deleteFreelancer(freelancerId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
				throw new Error("L'ID utilisateur n'est pas valide.");
			}

			const result = await this.model.findByIdAndDelete(freelancerId);
			if (!result) {
				throw new Error(
					"Aucun utilisateur trouvé avec cet ID pour la suppression."
				);
			}

			return "Suppression réussie";
		} catch (error) {
			throw new Error(
				`Erreur lors de la suppression de l'utilisateur : ${error.message}`
			);
		}
	}
}

export default UserFreelancerRepository;
