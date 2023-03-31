import webPushController from "../controllers/webPushController";

import { Router } from "express";
const router = Router();
router.post("/info", webPushController().info);
router.post("/subscribe", webPushController().subscribe);
router.delete("/unsubscribe", webPushController().unsubscribe);
router.get("/update", webPushController().update);
export default router;
