if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
var session = require("express-session");
var passport = require("passport");
const rutaMain = require("./routes/rutaMain.js");
const LocalStrategy = require("passport-local").Strategy;
require("./config/passport.js")(passport);
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
const rutaAdministrador = require("./routes/rutasAdministrador/route.js");
const rutaAlumno = require("./routes/rutasAlumno/route.js");
const rutaProfesor = require("./routes/rutasProfesor/ruta.js");
const rutaEmails = require("./routes/rutaEmails.js");

// importa las rutas API
const carreraRoutes = require("./routes/carreraRoutes");
const uaRoutes = require("./routes/uaRoutes");
const datosMedicosRoutes = require("./routes/datosMedicosRoutes");

const avisosRoutes = require("./routes/avisosRoutes");

const app = express();
app.set("port", 4000);
// Aumentar límite para permitir imágenes en base64
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
console.log("Servidor corriendo en puerto", app.get("port"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);

app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Rutas existentes con passport
app.use("/", rutaMain(passport));
app.use("/", rutaAdministrador(passport));
app.use("/", rutaAlumno(passport));
app.use("/", rutaProfesor(passport));
app.use("/", rutaEmails(passport));

// monta las rutas API
app.use("/api/carreras", carreraRoutes);
app.use("/api/unidades", uaRoutes);

app.use("/api/datos-medicos", datosMedicosRoutes);
app.use("/api/avisos", avisosRoutes);
app.listen(app.get("port"));
