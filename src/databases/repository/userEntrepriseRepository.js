import CommonUserRepository from "./CommonUserRepository.js";
import UserEntreprise from "../models/user_Entreprise.js";
import mongoose from "mongoose";

class UserEntrepriseRepository extends CommonUserRepository {
	constructor() {
		super(UserEntreprise);
	}

	async getUserByEmailRepresentant(emailRepresentant) {
		try {
			return await UserEntreprise.findOne({ emailRepresentant });
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de l'utilisateur entreprise par e-mail : ${error.message}`
			);
		}
	}

	async getAllUsers() {
		try {
			const allUsers = await UserEntreprise.find();
			return allUsers;
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de tous les utilisateurs : ${error.message}`
			);
		}
	}

	async getAllConfirmedUsers() {
		try {
			const confirmedUsers = await UserEntreprise.find({
				isEmailConfirmed: true,
			});
			return confirmedUsers;
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de tous les utilisateurs confirmés : ${error.message}`
			);
		}
	}

	async getConfirmedUserById(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'ID de l'entreprise n'est pas valide.");
			}

			const user = await UserEntreprise.findById(userId).where({
				isEmailConfirmed: true,
			});

			if (!user) {
				throw new Error("Aucun utilisateur confirmé trouvé avec cet ID.");
			}

			return user;
		} catch (error) {
			throw new Error(
				`Erreur lors de la récupération de l'utilisateur confirmé par ID : ${error.message}`
			);
		}
	}
}

export default UserEntrepriseRepository;
