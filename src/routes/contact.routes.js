const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth.middleware");

const router = express.Router();


// CREATE
router.post("/", auth, async (req, res) => {

  try {
    const contact = await Contact.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(contact);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }

});


// SEARCH/LIST
router.get("/", auth, async (req, res) => {

  const query = req.query.query || "";

  const contacts = await Contact.find({
    userId: req.user.id,
    nombre: { $regex: query, $options: "i" }
  });

  res.json(contacts);

});


// GET BY ID
router.get("/:id", auth, async (req, res) => {

  const contact = await Contact.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if(!contact) return res.status(404).json({ error: "Contacto no encontrado" });

  res.json(contact);

});


// UPDATE
router.put("/:id", auth, async (req, res) => {

  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if(!contact) return res.status(404).json({ error: "Contacto no encontrado" });

  res.json(contact);

});


// DELETE
router.delete("/:id", auth, async (req, res) => {

  const result = await Contact.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  if(!result) return res.status(404).json({ error: "Contacto no encontrado" });

  res.json({ deleted: true });

});

module.exports = router;