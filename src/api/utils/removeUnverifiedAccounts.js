const removeUnverifiedAccounts = async (UserModel) => {
	try {
		const deletionResult = await UserModel.deleteMany({
			isEmailConfirmed: false,
			createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		});

		console.log(
			`${deletionResult.deletedCount} unverified accounts from ${UserModel.modelName} have been deleted.`
		);
	} catch (error) {
		console.error(
			`Error deleting unverified accounts from ${UserModel.modelName}:`,
			error
		);
	}
};

export { removeUnverifiedAccounts };
