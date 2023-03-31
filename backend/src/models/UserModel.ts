import mongoose from "mongoose";
const Schema = mongoose.Schema;
const user = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  image: { type: String, require: true },
});
// Manga.plugin(mongooseDelete, { overrideMethods: 'all' });
// module.exports = mongoose.model("user", user);
export default mongoose.model("user", user);
