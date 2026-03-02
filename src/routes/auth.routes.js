const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  try{
    const { nombre, email, password, edad } = req.body;
    if(!nombre || !email || !password || !edad) return res.status(400).json({ error: 'Faltan campos' });
    if(Number(edad) < 18) return res.status(400).json({ error: 'Debes tener al menos 18 años' });

    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hash,
      edad
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret');

    res.json({ message: "Usuario creado", token });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }

});


// LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).json({ error: "No existe" });

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  if (!valid)
    return res.status(401).json({ error: "Incorrecto" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token });

});


// GET /api/me
router.get("/me", auth, async (req, res) => {

  const user = await User.findById(req.user.id);

  res.json(user);

});


module.exports = router;