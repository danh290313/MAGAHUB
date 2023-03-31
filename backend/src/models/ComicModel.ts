import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Comic = new Schema(
  {
    status: { type: String, require: true },
    author: { type: String, require: true },
    genres: [
      {
        id: { type: String, require: true },
        value: { type: String, require: true },
        label: { type: String, require: true },
        _id: { type: String },
      },
    ],
    otherName: { type: String, require: true },
    review: { type: String, require: true },
    newChapter: { type: String, require: true },
    thumbnail: { type: String, require: true },
    name: { type: String, require: true },
    slug: { type: String, require: true },
    sourcesAvailable: [
      {
        sourceName: { type: String },
        sourceSlug: { type: String },
        _id: { type: String },
      },
    ],
    __v: { type: Number },
    chapters: { type: String },
    votes: [{ type: String }],
  },
  { timestamps: true }
);
// Manga.plugin(mongooseDelete, { overrideMethods: 'all' });
// module.exports = mongoose.model("comic", Comic);
export default mongoose.model("comic", Comic);
