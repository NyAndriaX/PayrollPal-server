import CommonUserRepository from "./CommonUserRepository.js";
import User from "../models/user_Admin.js";

class UserAdminRepository extends CommonUserRepository {
	constructor() {
		super(User);
	}
}

export default UserAdminRepository;
