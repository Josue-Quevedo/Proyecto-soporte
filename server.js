const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// coneccion a mongodb
mongoose
  .connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

// ruta del log in
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    res.json({ message: "Login exitoso", user });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// registro de usuario
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
