import User from "../models/user_Admin.js";
import bcrypt from "bcrypt";

class UserAdminRepository {
	async createUser(userData) {
		try {
			const { password, ...otherUserData } = userData;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
				...otherUserData,
				password: hashedPassword,
			});
			const savedUser = await user.save();
			return savedUser;
		} catch (error) {
			throw new Error(
				"Erreur lors de la création de l'utilisateur : " + error.message
			);
		}
	}

	async getUserByEmail(email) {
		try {
			return await User.findOne({ email });
		} catch (error) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur par email : " +
					error.message
			);
		}
	}
}

export default UserAdminRepository;
