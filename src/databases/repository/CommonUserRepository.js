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

	async validateResetToken(token) {
		try {
			const user = await this.UserModel.findOne({
				resetPasswordToken: token,
				resetPasswordExpires: { $gt: Date.now() },
			});
			return user;
		} catch (error) {
			throw error;
		}
	}

	async resetPassword(email, token) {
		try {
			const user = await this.UserModel.findOne({
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
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmail(email) {
		try {
			const user = await this.UserModel.findOne({
				$or: [{ representantEmail: email }, { email: email }],
			});
			return user;
		} catch (error) {
			throw error;
		}
	}
	async getUserById(userId) {
		try {
			const user = await this.UserModel.findById(userId);
			return user;
		} catch (error) {
			throw error;
		}
	}
	async getUserByEmailAndAdminValidate(email) {
		try {
			const user = await this.UserModel.findOne({ email, adminValidate: true });
			return user;
		} catch (error) {
			throw error;
		}
	}
}

export default CommonUserRepository;
