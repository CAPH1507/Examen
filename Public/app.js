const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");
let idEditar = null;

// Consultar las actividades que están guardadas en el servidor.
async function consultar() {
    const respuesta = await fetch("/api/actividades");
    const actividades = await respuesta.json();
    resultado.innerHTML = "";

    if (actividades.length == 0) {
        resultado.innerHTML = "<p>No hay actividades registradas.</p>";
        return;
    }

    actividades.forEach(function(item) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        const titulo = document.createElement("h3");
        titulo.textContent = item.actividad;
        const empleado = document.createElement("p");
        empleado.textContent = "Empleado: " + item.nombre + " " + item.apellido;
        const descripcion = document.createElement("p");
        descripcion.textContent = "Descripción: " + item.descripcion;
        const estado = document.createElement("p");
        estado.textContent = "Estado: " + item.estado;
        estado.className = "estado";
        const boton = document.createElement("button");
        boton.textContent = "Modificar";
        boton.onclick = function() { prepararEdicion(item); };

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(empleado);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(estado);
        tarjeta.appendChild(boton);
        resultado.appendChild(tarjeta);
    });
}

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    const seleccionado = document.querySelector('input[name="proceso"]:checked');
    if (!seleccionado) {
        alert("Selecciona un estado");
        return;
    }

    const datos = {
        nombre: document.getElementById("nombres").value.trim(),
        apellido: document.getElementById("apellidos").value.trim(),
        actividad: document.getElementById("actividad").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        estado: seleccionado.value
    };

    let respuesta;
    if (idEditar == null) {
        respuesta = await fetch("/api/actividades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
    } else {
        respuesta = await fetch("/api/actividades/" + idEditar, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
    }

    const resultadoServidor = await respuesta.json();
    mensaje.textContent = resultadoServidor.mensaje;
    formulario.reset();
    idEditar = null;
    document.getElementById("guardar").textContent = "Guardar";
    consultar();
});

function prepararEdicion(item) {
    idEditar = item.id;
    document.getElementById("nombres").value = item.nombre;
    document.getElementById("apellidos").value = item.apellido;
    document.getElementById("actividad").value = item.actividad;
    document.getElementById("descripcion").value = item.descripcion;
    document.querySelector('input[name="proceso"][value="' + item.estado + '"]').checked = true;
    document.getElementById("guardar").textContent = "Actualizar";
    window.scrollTo(0, 0);
}

formulario.addEventListener("reset", function() {
    idEditar = null;
    document.getElementById("guardar").textContent = "Guardar";
});

consultar();
