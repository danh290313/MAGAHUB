import cors from "cors";
import express from "express";
import connect from "./config/db";
import routes from "./routes";
import { config } from "dotenv";
import webpush from "web-push";
import { publicVapidKey, privateVapidKey } from "./config";
import tasks from "./services/cron.service";
config();
const app = express();

connect();
webpush.setVapidDetails(
  "mailto:tunguyen118108@gmail.com",
  publicVapidKey,
  privateVapidKey
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
routes(app);
app.listen(4000, () => {
  console.log("The application is listening on port 4000!");
});
tasks.forEach((task) => task.start());
module.exports = app;
