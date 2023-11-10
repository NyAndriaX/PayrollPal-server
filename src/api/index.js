import { Router } from "express";
import authentificationRoute from "./authentification/auth.route.js";
import adminRoute from "./admin/admin.route.js";
import companyRoute from "./company/company.route.js";
import freelanceRoute from "./freelance/freelance.route.js";

const apiRoutes = Router();

apiRoutes.use("/company", companyRoute);
apiRoutes.use("/auth", authentificationRoute);
apiRoutes.use("/admin", adminRoute);
apiRoutes.use("/freelance", freelanceRoute);

export default apiRoutes;
