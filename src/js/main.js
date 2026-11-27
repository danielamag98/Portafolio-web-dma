// ---------- 1. Año automático ----------
var anio = document.getElementById("anio-actual");
anio.textContent = new Date().getFullYear();


// ---------- 2. Botón de volver arriba ----------
var botonSubir = document.getElementById("boton-subir");

// Cada vez que la persona hace scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    botonSubir.style.display = "block";   // si ya bajó mucho: muestro el botón
  } else {
    botonSubir.style.display = "none";    // si está arriba: lo escondo
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
    menuMovil.classList.remove("show");
  });
});


// ---------- 4. Formulario de contacto ----------
// FormSubmit: manda el mensaje a mi correo sin necesitar servidor propio.
var CORREO_DESTINO = "daniela.98mg@gmail.com";

var formulario = document.getElementById("formulario-contacto");
var botonEnviar = document.getElementById("boton-enviar");
var estadoForm = document.getElementById("estado-form");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // evito que la página se recargue

  botonEnviar.disabled = true;
  botonEnviar.textContent = "Enviando...";

  var datos = {
    name: formulario.elements["name"].value,
    email: formulario.elements["email"].value,
    message: formulario.elements["message"].value,
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
      if (String(resultado.success) === "true") {
        estadoForm.className = "estado-form estado-ok";
        estadoForm.textContent = "¡Gracias! Tu mensaje se envió, te responderé pronto.";
        formulario.reset();
      } else {
        estadoForm.className = "estado-form estado-error";
        estadoForm.textContent = "No se pudo enviar. Escríbeme directo a " + CORREO_DESTINO;
      }
    })
    .catch(function () {
      estadoForm.className = "estado-form estado-error";
      estadoForm.textContent = "No se pudo enviar. Escríbeme directo a " + CORREO_DESTINO;
    })
    .finally(function () {
      botonEnviar.disabled = false;
      botonEnviar.textContent = "Enviar mensaje";
    });
});


// ---------- 5. Carrusel de proyectos ----------
var pistaProyectos = document.getElementById("pista-proyectos");
var flechaIzq = document.getElementById("flecha-izq");
var flechaDer = document.getElementById("flecha-der");

// cuanto se mueve en cada clic
function pasoCarrusel() {
  var tarjeta = pistaProyectos.querySelector(".carrusel-item");
  return tarjeta.offsetWidth + 24;
}

// apaga la flecha cuando ya no hay mas proyectos hacia ese lado
function actualizarFlechas() {
  var maximo = pistaProyectos.scrollWidth - pistaProyectos.clientWidth;
  flechaIzq.disabled = pistaProyectos.scrollLeft <= 2;
  flechaDer.disabled = pistaProyectos.scrollLeft >= maximo - 2;
}

flechaIzq.addEventListener("click", function () {
  pistaProyectos.scrollBy({ left: -pasoCarrusel(), behavior: "smooth" });
});
flechaDer.addEventListener("click", function () {
  pistaProyectos.scrollBy({ left: pasoCarrusel(), behavior: "smooth" });
});

pistaProyectos.addEventListener("scroll", actualizarFlechas);
actualizarFlechas();
