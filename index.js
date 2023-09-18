require("dotenv").config();
var express = require("express");
const cors = require("cors");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = 3800;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// CONEXION BD
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conexión exitosa a la base de datos");
});

mongoose.connection.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});

// SERVER INIT
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

//RUTA
app.use("/task", require("./routes/task"));

module.exports = app;
