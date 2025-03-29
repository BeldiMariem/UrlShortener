const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Url", urlSchema);