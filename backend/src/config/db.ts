import mongoose from "mongoose";
import { MONGO_URL } from "./index";
mongoose.set("strictQuery", true);
async function connect() {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("connect db successfully !!!");
  } catch (error) {
    console.log("connect db failed", error);
  }
}
export default connect;
