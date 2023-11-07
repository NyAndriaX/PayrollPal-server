import { Router } from "express";
import authentificationRoute from "./authentification/auth.route.js";
import adminRoute from "./admin/admin.route.js";
import companyRoute from "./company/company.route.js";

const apiRoutes = Router();

apiRoutes.use("/company", companyRoute);
apiRoutes.use("/auth", authentificationRoute);
apiRoutes.use("/admin", adminRoute);

export default apiRoutes;
