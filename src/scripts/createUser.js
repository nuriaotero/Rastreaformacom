require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function crearUsuario() {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Conectado a MongoDB");

    const passwordHash = await bcrypt.hash("123456", 10);

    const nuevoUsuario = new User({
      nombre: "Juan Perez",
      email: "juan@email.com",
      password: passwordHash,
      edad: 30
    });

    await nuevoUsuario.save();

    console.log("✅ Usuario creado correctamente");

    process.exit();

  } catch (error) {

    console.error(error);

  }

}

crearUsuario();