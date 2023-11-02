import mongoose from "mongoose";
import UserFreelancer from "../models/user_Freelancer.js";
import bcrypt from "bcrypt";

class UserFreelancerRepository {
	async createUser(userData) {
		try {
			const { password, ...otherUserData } = userData;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new UserFreelancer({
				...otherUserData,
				password: hashedPassword,
			});
			return await user.save();
		} catch (error) {
			throw new Error(
				"Erreur lors de la création de l'utilisateur Freelancer : " +
					error.message
			);
		}
	}

	async getUserByEmail(email) {
		try {
			return await UserFreelancer.findOne({ email });
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur Freelancer par email : " +
					error.message
			);
		}
	}

	async getEmailVerificationCode(emailVerificationCode) {
		try {
			const user = await UserFreelancer.findOne({ emailVerificationCode });
			console.log(user);
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

	async getAdminValidatedUsers() {
		try {
			const users = await UserFreelancer.find({
				adminValidate: true,
				isEmailConfirmed: true,
			});
			return users;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs validés par l'admin : " +
					error.message
			);
		}
	}

	async getAdminValidatedUsersAndId(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'utilisateur n'est pas valide.");
			}

			const validatedUsers = await UserFreelancer.find({
				_id: userId,
				adminValidate: true,
				isEmailConfirmed: true,
			});
			return validatedUsers;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getAdminNotValidatedUsers() {
		try {
			const users = await UserFreelancer.find({
				adminValidate: false,
				isEmailConfirmed: true,
			});
			return users;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs non validés par l'admin : " +
					error.message
			);
		}
	}
	async getAdminNotValidatedUsersAndId(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'utilisateur n'est pas valide.");
			}

			const users = await UserFreelancer.find({
				_id: userId,
				adminValidate: false,
				isEmailConfirmed: true,
			});
			return users;
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs non validés par l'admin : " +
					error.message
			);
		}
	}

	async deleteUser(userId) {
		try {
			if (!mongoose.Types.ObjectId.isValid(userId)) {
				throw new Error("L'utilisateur n'est pas valide.");
			}

			const result = await UserFreelancer.findByIdAndDelete(userId);
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

export default UserFreelancerRepository;
