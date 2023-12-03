const deleteAutoAccountsForCompany = async (UserModel) => {
	try {
		await UserModel.deleteMany({
			isEmailConfirmed: false,
			createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		});
	} catch (error) {
		throw error;
	}
};
const deleteAutoAccountsForFreelancer = async (UserModel) => {
	try {
		await UserModel.deleteMany({
			isCompletedInfos: false,
			isEmailConfirmed: false,
			createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		});
	} catch (error) {
		throw error;
	}
};

export { deleteAutoAccountsForCompany, deleteAutoAccountsForFreelancer };
