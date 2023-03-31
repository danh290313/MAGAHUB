import { Router } from "express";
import * as ComicController from "../controllers/ComicController";
const router = Router();
router.get("/filter", ComicController.getFilterComic);
router.get("/", ComicController.getNewComic);
export default router;
