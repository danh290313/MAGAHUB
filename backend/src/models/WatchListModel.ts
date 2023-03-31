import mongoose, { Schema } from "mongoose";

const WatchList = new Schema({
  userId: { type: String, required: true },
  comics: [
    {
      slug: { type: String, required: true },
      readed: [{ type: String, required: true }],
      lastTimeReaded: { type: Number, required: true },
    },
  ],
});
export default mongoose.model("watchlist", WatchList);
