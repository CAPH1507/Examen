const express = require("express");
const router = express.Router();
const controlador = require("../Controllers/actividadController");

router.get("/", controlador.consultar);
router.post("/", controlador.registrar);
router.put("/:id", controlador.actualizar);

module.exports = router;
