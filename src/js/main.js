// ---------- 1. Año automático ----------
var año = document.getElementById("año-actual");

// Le cambio el texto por el año de hoy
año.textContent = new Date().getFullYear();


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
