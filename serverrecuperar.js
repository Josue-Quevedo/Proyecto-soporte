const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de transporte de correo 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tucorreo@gmail.com", // reemplaza con tu correo
        pass: "tucontraseña"        // usa una contraseña segura o App Password
    }
});

app.post("/recuperar", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Correo requerido." });
    }

    const mailOptions = {
        from: "tucorreo@gmail.com",
        to: email,
        subject: "Recuperación de contraseña",
        text: "Haz clic en este enlace para restablecer tu contraseña: http://localhost:3000/reset"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al enviar el correo." });
        }
        res.json({ message: "Correo de recuperación enviado." });
    });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
