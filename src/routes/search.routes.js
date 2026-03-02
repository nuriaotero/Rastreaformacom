const express = require("express");
const Contact = require("../models/Contact");
const axios = require("axios");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

// search contacts in database (requires auth)
router.get("/", auth, async (req, res) => {
  const query = req.query.query || "";
  const contacts = await Contact.find({ nombre: { $regex: query, $options: "i" } });
  res.json(contacts);
});

// google custom search proxy
router.get("/google", auth, async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "query missing" });
  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;
  if (!key || !cx) return res.status(500).json({ error: "google config missing" });
  try {
    const resp = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: { key, cx, q: query }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "google search failed" });
  }
});

module.exports = router;
module.exports = router;