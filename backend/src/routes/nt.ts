import * as ntController from "../controllers/NtController";

import { Router } from "express";
const router = Router();
router.get("/", ntController.getHotComic);
export default router;
