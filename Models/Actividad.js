const fs = require("fs");
const path = require("path");

// Cada actividad se guarda en un nodo de la lista enlazada.
class Nodo {
    constructor(actividad) {
        this.actividad = actividad;
        this.siguiente = null;
    }
}

class ListaActividades {
    constructor() {
        this.inicio = null;
        this.archivo = path.join(__dirname, "../Datos/actividades.txt");
        this.cargar();
    }

    agregar(actividad) {
        const nuevo = new Nodo(actividad);
        if (this.inicio == null) {
            this.inicio = nuevo;
        } else {
            let actual = this.inicio;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        this.guardar();
    }

    obtenerTodas() {
        let actividades = [];
        let actual = this.inicio;
        while (actual != null) {
            actividades.push(actual.actividad);
            actual = actual.siguiente;
        }
        return actividades;
    }

    actualizar(id, nuevosDatos) {
        let actual = this.inicio;
        while (actual != null) {
            if (actual.actividad.id == id) {
                actual.actividad = { ...actual.actividad, ...nuevosDatos };
                this.guardar();
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    guardar() {
        // El archivo TXT contiene los datos en formato JSON.
        fs.writeFileSync(this.archivo, JSON.stringify(this.obtenerTodas(), null, 2));
    }

    cargar() {
        if (fs.existsSync(this.archivo)) {
            const contenido = fs.readFileSync(this.archivo, "utf8");
            if (contenido.trim() != "") {
                const actividades = JSON.parse(contenido);
                for (let actividad of actividades) {
                    const nuevo = new Nodo(actividad);
                    if (this.inicio == null) {
                        this.inicio = nuevo;
                    } else {
                        let actual = this.inicio;
                        while (actual.siguiente != null) actual = actual.siguiente;
                        actual.siguiente = nuevo;
                    }
                }
            }
        }
    }
}

module.exports = new ListaActividades();
