document.addEventListener('DOMContentLoaded', function() {
    cargarPerfil();

    document.getElementById("guardarCambios").addEventListener("click", function() {
        actualizarPerfil();
    });

    document.getElementById("editar_foto").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.getElementById("fotoPreview");
                imgElement.src = e.target.result;
                imgElement.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
});

function cargarPerfil() {
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));

    if (usuario) {
        document.getElementById("user").textContent = usuario.nombre;
        document.getElementById("correoPerfil").textContent = usuario.correo;
        document.getElementById("fotoPerfil").src = usuario.foto || '/Assets/Archivos/img/icon.png';
        
        document.getElementById("editar_nombre").value = usuario.nombre;
        document.getElementById("editar_correo").value = usuario.correo;
        
        if (usuario.foto) {
            document.getElementById("fotoPreview").src = usuario.foto;
            document.getElementById("fotoPreview").style.display = "block";
        }
    } else {
        alert("No se pudo cargar la información del perfil.");
    }
}

function actualizarPerfil() {
    const nombre = document.getElementById("editar_nombre").value.trim();
    const correo = document.getElementById("editar_correo").value.trim();
    const fotoInput = document.getElementById("editar_foto");
    const fotoFile = fotoInput.files[0];

    if (!nombre || !correo) {
        alert("No debe dejar campos vacíos");
        return;
    }

    let usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));

    if (usuario) {
        usuario.nombre = nombre;
        usuario.correo = correo;

        if (fotoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                usuario.foto = e.target.result;
                document.getElementById("fotoPerfil").src = usuario.foto;
                document.getElementById("fotoPreview").src = usuario.foto;
                document.getElementById("fotoPreview").style.display = "block";
                
                actualizarUsuarioEnAlmacen(usuario);
            };
            reader.readAsDataURL(fotoFile);
        } else {
            usuario.foto = usuario.foto || '/Assets/Archivos/img/icon.png';
            actualizarUsuarioEnAlmacen(usuario);
        }
    } else {
        alert("No se pudo cargar la información del perfil.");
    }
}

function actualizarUsuarioEnAlmacen(usuario) {
    const almacenado = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = almacenado.findIndex(u => u.correo === usuario.correo);

    if (index !== -1) {
        almacenado[index] = usuario;
        localStorage.setItem("usuarios", JSON.stringify(almacenado));
        sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert("Perfil actualizado");
        
        document.getElementById("user").textContent = usuario.nombre;
        document.getElementById("correoPerfil").textContent = usuario.correo;
    } else {
        alert("Error al actualizar el perfil");
    }
}
