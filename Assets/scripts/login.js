
//guardar correo

function ingresar() {
  const correo = document.getElementById("correo").value.trim(); // Elimina espacios en blanco
  
  if (!correo) {
    alert("Debe ingresar un correo");
    return; // Asegúrate de salir de la función si el correo está vacío
  }
  
  const almacenado = localStorage.getItem("correo");
  console.log("Correo ingresado:", correo); // Depuración
  console.log("Correo almacenado:", almacenado); // Depuración

  if (correo === almacenado) {
 
    window.location.href = "../../Views/main.html"; 
  } else {
    alert("Correo no registrado");
  }
}

function guardarcorreo() {
  const correo = document.getElementById("registrar_correo").value.trim(); // .trim() para eliminar espacios en blanco

  if (!correo) {
    alert("Debe ingresar un correo");
    return;
  }
  
  localStorage.setItem("correo", correo);
  alert("Correo registrado");

  // Oculta el registro y muestra el login
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// Mostrar registro al hacer clic en "inscribirse"
document.getElementById("ingresar").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "block";
});
