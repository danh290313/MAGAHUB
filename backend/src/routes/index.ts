////////////////////////////////////////////////////////////////
import { Express } from "express";
import lhmangaRouter from "./lhmanga";
import ntRouter from "./nt";
import notifyRouter from "./notify";
import userRouter from "./user";
function routes(app: Express) {
  app.use("/lhmanga", lhmangaRouter);
  app.use("/nt", ntRouter);
  app.use("/notify", notifyRouter);
  app.use("/user", userRouter);
  app.use("/", (req, res) => res.json({ success: true }));
}

export default routes;
