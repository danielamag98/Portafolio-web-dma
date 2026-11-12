// ---------- 1. Año automático ----------
var anio = document.getElementById("anio-actual");

// Le cambio el texto por el año de hoy
anio.textContent = new Date().getFullYear();


// ---------- 2. Botón de volver arriba ----------
var botonSubir = document.getElementById("boton-subir");

// Cada vez que la persona hace scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    botonSubir.style.display = "block";   // ya bajó mucho: muestro el botón
  } else {
    botonSubir.style.display = "none";    // está arriba: lo escondo
  }
});

// Cuando hacen clic en el botón, regreso al inicio
botonSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---------- 3. Cerrar el menú del celular al elegir una sección ----------
var menuMovil = document.getElementById("enlaces");
var enlacesMenu = document.querySelectorAll("#enlaces .nav-link");

enlacesMenu.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    if (menuMovil.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menuMovil).hide();
    }
  });
});


// ---------- 4. Formulario de contacto (funcional) ----------
// Usa FormSubmit: manda el mensaje a tu correo sin necesitar servidor propio.
var CORREO_DESTINO = "daniela.98mg@gmail.com";

var formulario = document.getElementById("formulario-contacto");
var botonEnviar = document.getElementById("boton-enviar");
var estadoForm = document.getElementById("estado-form");

// Muestra un mensaje debajo del botón (tipo: "ok" o "error")
function mostrarEstado(texto, tipo) {
  estadoForm.className = "estado-form estado-" + tipo;
  estadoForm.textContent = texto;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // evito que la página se recargue

  // Si el campo trampa tiene algo, es un bot: no envío nada
  if (formulario.elements["_honey"].value !== "") {
    return;
  }

  botonEnviar.disabled = true;
  botonEnviar.textContent = "Enviando...";
  mostrarEstado("", "ok");

  var datos = {
    name: formulario.elements["name"].value.trim(),
    email: formulario.elements["email"].value.trim(),
    message: formulario.elements["message"].value.trim(),
    _subject: "Nuevo mensaje desde tu portafolio",
    _template: "table",
    _captcha: "false"
  };

  fetch("https://formsubmit.co/ajax/" + CORREO_DESTINO, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(datos)
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (resultado) {
      if (resultado.success === "true" || resultado.success === true) {
        mostrarEstado("¡Gracias! Tu mensaje se envió, te responderé pronto.", "ok");
        formulario.reset();
      } else {
        throw new Error("No se pudo enviar");
      }
    })
    .catch(function () {
      // Plan B: que la persona pueda escribirme directo
      estadoForm.className = "estado-form estado-error";
      estadoForm.textContent = "No se pudo enviar. Escríbeme directo a ";
      var enlaceCorreo = document.createElement("a");
      enlaceCorreo.href = "mailto:" + CORREO_DESTINO;
      enlaceCorreo.textContent = CORREO_DESTINO;
      estadoForm.appendChild(enlaceCorreo);
    })
    .finally(function () {
      botonEnviar.disabled = false;
      botonEnviar.textContent = "Enviar mensaje";
    });
});