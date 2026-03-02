require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");
const searchRoutes = require("./routes/search.routes");
const User = require("./models/User");

const app = express();

// serve frontend static files
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo conectado"));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/search", searchRoutes);

// default catch-all to send index.html (for SPA or basic landing)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(3000);