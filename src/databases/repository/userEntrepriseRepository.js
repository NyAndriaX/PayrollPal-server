import mongoose from "mongoose";
import UserEntreprise from "../models/user_Entreprise.js";
import bcrypt from "bcrypt";

class UserEntrepriseRepository {
	async createUser(userData) {
		try {
			const { password, ...otherUserData } = userData;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new UserEntreprise({
				...otherUserData,
				password: hashedPassword,
			});
			return await user.save();
		} catch (error) {
			console.log(error);
			throw new Error(
				"Erreur lors de la création de l'utilisateur entreprise : " +
					error.message
			);
		}
	}

	async getUserByEmail(emailRepresentant) {
		try {
			return await UserEntreprise.findOne({ emailRepresentant });
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur entreprise par email : " +
					error.message
			);
		}
	}
	async getEmailVerificationCode(emailVerificationCode) {
		try {
			const user = await UserEntreprise.findOne({ emailVerificationCode });

			if (!user) {
				throw new Error("Aucun utilisateur trouvé avec ce token.");
			}

			return user;
		} catch (error) {
			throw new Error(
				"Erreur lors de la recherche de l'utilisateur par token : " +
					error.message
			);
		}
	}
	async getUserById(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'entreprise n'est pas valide.");
			}

			const user = await UserEntreprise.findById(userId);

			if (!user) {
				throw new Error("Aucun utilisateur trouvé avec cet ID.");
			}

			return user;
		} catch (error) {
			throw new Error(
				"Erreur lors de la recherche de l'utilisateur par ID : " + error.message
			);
		}
	}

	async getAllUsers() {
		try {
			const users = await UserEntreprise.find({ isEmailConfirmed: true });
			return users;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de tous les utilisateurs : " +
					error.message
			);
		}
	}
	async getUserWithId(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'entreprise n'est pas valide.");
			}

			const users = await UserEntreprise.find({
				isEmailConfirmed: true,
				_id: userId,
			});
			return users;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de tous les utilisateurs : " +
					error.message
			);
		}
	}

	async deleteUser(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'entreprise n'est pas valide.");
			}

			const result = await UserEntreprise.findByIdAndDelete(userId);
			if (!result) {
				throw new Error(
					"Aucun utilisateur trouvé avec cet ID pour la suppression"
				);
			}
			return "Suppression reussi";
		} catch (error) {
			throw new Error(
				"Erreur lors de la suppression de l'utilisateur " + error.message
			);
		}
	}
}

export default UserEntrepriseRepository;
