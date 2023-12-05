import bcrypt from "bcrypt";

class CommonUserRepository {
	constructor(UserModel) {
		this.UserModel = UserModel;
	}

	async createUser(userData) {
		try {
			const { password, ...otherUserData } = userData;
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new this.UserModel({
				...otherUserData,
				password: hashedPassword,
			});
			return await user.save();
		} catch (error) {
			throw error;
		}
	}
	async updateUserProfile(userId, updatedUserData) {
		try {
			const { password, ...otherUpdatedData } = updatedUserData;

			const updatedUser = await this.UserModel.findByIdAndUpdate(
				userId,
				{ $set: otherUpdatedData },
				{ new: true }
			);

			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async updatePassword(userId, newPassword) {
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			const updatedUser = await this.UserModel.findByIdAndUpdate(
				userId,
				{ $set: { password: hashedPassword } },
				{ new: true }
			);

			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async validateResetToken(token) {
		try {
			return await this.UserModel.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: Date.now() },
			});
		} catch (error) {
			throw error;
		}
	}

	async resetPassword(email, token) {
		try {
			return await this.UserModel.findOne({
				$or: [
					{
						representantEmail: email,
						resetPasswordToken: token,
						resetPasswordExpires: { $gt: Date.now() },
					},
					{
						email: email,
						resetPasswordToken: token,
						resetPasswordExpires: { $gt: Date.now() },
					},
				],
			});
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmail(email) {
		try {
			return await this.UserModel.findOne({
				$or: [{ representantEmail: email }, { email: email }],
			});
		} catch (error) {
			throw error;
		}
	}

	async getUserById(userId) {
		try {
			return await this.UserModel.findById(userId);
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmailAndAdminValidate(email) {
		try {
			return await this.UserModel.findOne({ email, adminValidate: true });
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(userId) {
		try {
			return await this.UserModel.findByIdAndDelete(userId);
		} catch (error) {
			throw error;
		}
	}
}

export default CommonUserRepository;
