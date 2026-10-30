const lista = require("../Models/Actividad");

exports.consultar = (req, res) => {
    res.json(lista.obtenerTodas());
};

exports.registrar = (req, res) => {
    const { nombre, apellido, actividad, descripcion, estado } = req.body;
    if (!nombre || !apellido || !actividad || !descripcion || !estado) {
        return res.status(400).json({ mensaje: "Completa todos los campos" });
    }

    const nuevaActividad = {
        id: Date.now().toString(),
        nombre,
        apellido,
        actividad,
        descripcion,
        estado
    };
    lista.agregar(nuevaActividad);
    res.json({ mensaje: "Actividad guardada" });
};

exports.actualizar = (req, res) => {
    const actualizado = lista.actualizar(req.params.id, req.body);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "No se encontró la actividad" });
    }
    res.json({ mensaje: "Actividad actualizada" });
};
