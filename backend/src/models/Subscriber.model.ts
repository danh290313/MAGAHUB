import mongoose, { Date } from "mongoose";
import { ISubscriber } from "../types";
const { Schema } = mongoose;

const SubscribersSchema = new Schema<ISubscriber>(
  {
    userId: {
      type: String,
      require: true,
      index: true,
      unique: true,
    },

    subComics: [
      {
        comicSlug: { type: String, require: true },
        lastestChap: { type: String, require: true },
      },
    ],

    identifications: [
      {
        endpoint: {
          type: String,
          required: true,
        },
        p256dh: {
          type: String,
          required: true,
        },
        auth: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubscriber>("subscribers", SubscribersSchema);
