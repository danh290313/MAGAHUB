import UserController from "../controllers/UserController";
import { Router } from "express";
const router = Router();
router.get("/follows", UserController().getFollows);
export default router;
