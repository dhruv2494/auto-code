const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  m_number: {
    type: Number,
    unique: true,
  },
  mongo_url: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
