import { Router, Request, Response } from "express";
import UserRoutes from "./user.routes";

const userRoutes = new UserRoutes();
const router:Router = Router();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.use(userRoutes.router);

export default router;
