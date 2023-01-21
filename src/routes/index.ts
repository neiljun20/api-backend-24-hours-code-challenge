import { Router, Request, Response } from "express";
import AuthRoutes from "./auth.routes";

const router:Router = Router();
const authRoutes = new AuthRoutes();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.use(authRoutes.router);

export default router;
