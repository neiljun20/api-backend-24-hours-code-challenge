import { Router, Request, Response } from "express";
import AuthRoutes from "./auth.routes";
import ImageRoutes from "./image.routes";

const router:Router = Router();
const authRoutes = new AuthRoutes();
const imageRoutes = new ImageRoutes();

router.get("/healthcheck", (req:Request, res:Response) => res.sendStatus(200));
router.use(authRoutes.router);
router.use(imageRoutes.router);

export default router;
