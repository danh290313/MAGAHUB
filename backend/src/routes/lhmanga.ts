import * as lhController from "../controllers/LhController";

import { Router } from "express";
const router = Router();
router.get("/", lhController.filterComic);
router.get("/filter", lhController.advancedFilterComic);
router.get("/search", lhController.search);
router.get("/hot-comic", lhController.getHotComic);
router.get("/comic/:name/:chapter", lhController.getChapter);
router.get("/comic/:name", lhController.getComic);
router.get("/genres", lhController.getAllGenres);
export default router;
