const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: String,
  edad: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", ContactSchema);