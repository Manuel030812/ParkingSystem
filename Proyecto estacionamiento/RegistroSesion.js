// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Agrega un event listener al botón con id "botonRegistro"
    document.getElementById("botonRegistro").addEventListener("click", function (event) {
        // Previene el comportamiento por defecto del botón (que sería enviar el formulario)
        event.preventDefault();

        // Obtiene los valores de los campos de entrada del formulario de registro
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correoRegistro").value;
        const telefono = document.getElementById("numRegistro").value;
        const contrasena = document.getElementById("contra").value;
        const confirmarContrasena = document.getElementById("confirmarContra").value;

        // Verifica que todos los campos estén llenos
        if (!nombre || !correo || !telefono || !contrasena || !confirmarContrasena) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Verifica que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Crea un objeto con los datos del usuario
        const usuario = {
            Nombre: nombre,
            Correo_Electronico: correo,
            Telefono: telefono,
            Contrasena: contrasena
        };

        // Realiza una solicitud HTTP POST a la URL especificada
        fetch("http://localhost:8080/ParkingSystem/agregarUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Convierte el objeto de usuario a una cadena JSON y lo envía en el cuerpo de la solicitud
            body: JSON.stringify(usuario)
        })
        .then(response => {
            // Verifica si la respuesta del servidor es exitosa
            if (response.ok) {
                // Convierte la respuesta a JSON y la retorna
                return response.json();
            }
            // Si la respuesta no es exitosa, lanza un error
            throw new Error("Error en la creación del usuario");
        })
        .then(data => {
            // Imprime el usuario creado en la consola y muestra una alerta de éxito
            console.log("Usuario creado:", data);
            alert("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = "InicioSesion.html";
        })
        .catch(error => {
            // Imprime el error en la consola y muestra una alerta con un mensaje de error
            console.error("Error:", error);
            alert("Error en la creación del usuario");
        });
    });
});
