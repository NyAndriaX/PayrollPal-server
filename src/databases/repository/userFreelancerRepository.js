import CommonUserRepository from "./CommonUserRepository.js";
import UserFreelancer from "../models/user_Freelancer.js";
import mongoose from "mongoose";

class UserFreelancerRepository extends CommonUserRepository {
	constructor() {
		super(UserFreelancer);
	}

	async getFreelancerByEmail(email) {
		try {
			const freelancer = await UserFreelancer.findOne({ email });

			if (freelancer && !freelancer.adminValidate) {
				throw new Error(
					"L'e-mail doit encore être validé par l'administrateur. Veuillez patienter, s'il vous plaît."
				);
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de l'utilisateur Freelancer par e-mail : ${error.message}`
			);
		}
	}

	async getAdminValidatedFreelancers() {
		try {
			return await UserFreelancer.find({
				adminValidate: true,
				isEmailConfirmed: true,
			});
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs validés par l'administrateur : ${error.message}`
			);
		}
	}

	async getAdminNotValidatedFreelancers() {
		try {
			return await UserFreelancer.find({
				adminValidate: false,
				isEmailConfirmed: true,
			});
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs non validés par l'administrateur : ${error.message}`
			);
		}
	}

	async getAdminNotValidatedFreelancerById(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'ID utilisateur n'est pas valide.");
			}

			return await UserFreelancer.findOne({
				_id: userId,
				adminValidate: false,
				isEmailConfirmed: true,
			});
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs non validés par l'administrateur par ID : ${error.message}`
			);
		}
	}
}

export default UserFreelancerRepository;
