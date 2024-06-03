// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Agrega un event listener al botón con id "botonInicioSesion"
    document.getElementById("botonInicioSesion").addEventListener("click", function (event) {
        // Previene el comportamiento por defecto del botón (que sería enviar el formulario)
        event.preventDefault();
        console.log("Botón de inicio de sesión presionado.");

        // Obtiene el valor del campo de correo electrónico
        const correo = document.querySelector(".introduce-tu-correo").value;
        // Obtiene el valor del campo de contraseña
        const contrasena = document.querySelector(".ingresa-tu-contrasea").value;

        // Imprime los valores de correo y contraseña en la consola (para depuración)
        console.log("Correo introducido:", correo);
        console.log("Contraseña introducida:", contrasena);

        // Verifica que ambos campos, correo y contraseña, no estén vacíos
        if (!correo || !contrasena) {
            // Muestra una alerta si alguno de los campos está vacío y termina la ejecución
            alert("Por favor, introduce tu correo electrónico y contraseña.");
            return;
        }

        // Crea un objeto con las credenciales del usuario
        const credenciales = {
            correo_electronico: correo,
            contrasena: contrasena
        };

        // Realiza una solicitud HTTP POST a la URL especificada
        fetch("http://localhost:8080/ParkingSystem/iniciarSesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Convierte el objeto de credenciales a una cadena JSON y lo envía en el cuerpo de la solicitud
            body: JSON.stringify(credenciales)
        })
        .then(response => {
            // Verifica si la respuesta del servidor es exitosa
            if (response.ok) {
                // Convierte la respuesta a JSON y la retorna
                return response.json();
            }
            // Si la respuesta no es exitosa, lanza un error
            throw new Error("Correo electrónico o contraseña incorrectos");
        })
        .then(data => {
            // Muestra un mensaje de alerta con el mensaje recibido del servidor
            alert(data.mensaje);
            // Redirige al usuario a la página "Inicio.html"
            window.location.href = "Inicio.html";
        })
        .catch(error => {
            // Imprime el error en la consola y muestra una alerta con un mensaje de error
            console.error("Error:", error);
            alert("Correo electrónico o contraseña incorrectos");
        });
    });
});
