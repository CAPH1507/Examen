const express = require("express");
const path = require("path");
const rutas = require("./Routes/actividadRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use("/api/actividades", rutas);

app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});
