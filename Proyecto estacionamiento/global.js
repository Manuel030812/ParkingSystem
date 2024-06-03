//hace que el el correo obtenido se cambio el nombre donde dice administrador por el nombre del usuario
fetch('http://localhost:8080/ParkingSystem/correo')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el correo electrónico del usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos del correo electrónico del usuario recibidos:", data);
        if (data.correo) {
            document.getElementById('NomUsuario').textContent = data.correo;
        } else {
            console.error('No hay usuario logueado');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        // Seleccionar la imagen con el ID 'info'
        var infoIcon = document.getElementById('info');
      
        // Añadir un event listener para el evento click
        infoIcon.addEventListener('click', function() {
          // Mostrar la alerta con el mensaje especificado
          alert('desarrolladores Manuel Lopez Guterrez, Cristhian Cabrera Rivera, Jose Manuel Maldonado Monzon y asesor Dr. Felipe Villarreal Wong');
        });
      });
      