const Contact = require("../models/Contact");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const query = process.argv[2];

console.log("Scraping:", query);

// ejemplo dummy
await Contact.updateOne(
  { url: "https://example.com" },
  {
    name: "Example",
    url: "https://example.com",
    emails: ["test@example.com"],
    phones: ["123456"],
    query
  },
  { upsert: true }
);

process.exit();