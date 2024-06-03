

// Escuchar el evento click del botón de enviar
document.getElementById('enviar-button').addEventListener('click', function() {
    // Capturar los valores de los campos de entrada
    var area = document.getElementById('area-input').value;
    var tipoVehiculo = document.getElementById('tipoDeVehiculos').value;
    var limite = document.getElementById('limite-input').value;
    var cargo = document.getElementById('cargo-input').value;
    var correo = document.getElementById('NomUsuario').textContent;

    // Construir el objeto de datos a enviar al backend, incluyendo el correo del usuario
    var data = {
        area: area,
        tVeiculos: tipoVehiculo,
        limitesVeiculos: limite,
        cargoxHora: cargo,
        correo: correo // Agregar el correo del usuario al objeto de datos
    };

    // Enviar la solicitud HTTP POST al backend
    fetch('http://localhost:8080/ParkingSystem/agregarCategoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos enviados exitosamente:', data);
        alert('Datos enviados exitosamente:', data);
        // Aquí puedes realizar cualquier acción adicional después de enviar los datos exitosamente
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error aquí
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el correo del usuario
    var correoUsuario = document.getElementById('NomUsuario').textContent;

    // Realizar la solicitud HTTP GET
    fetch('http://localhost:8080/ParkingSystem/ListarCategoria')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        var correoUsuario = document.getElementById('NomUsuario').textContent;

        // Filtrar las categorías basadas en el correo del usuario
        var categoriasUsuario = data.filter(item => item.correo === correoUsuario);

        // Llenar la tabla con las categorías del usuario
        var tableBody = document.querySelector('#categoria-table tbody');
        categoriasUsuario.forEach(item => {
          var row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.idCategoria}</td>
            <td>${item.area}</td>
            <td>${item.limitesVeiculos}</td>
            <td>${item.cargoxHora}</td>
            <td>${item.tVeiculos}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
});


  document.addEventListener('DOMContentLoaded', function () {
    // Realizar la solicitud HTTP GET
    fetch('http://localhost:8080/ParkingSystem/ListarCategoria')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            // Obtener el cuerpo de la tabla
            const tableBody = document.querySelector('#eliminarFilas');

            // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
            tableBody.innerHTML = '';

            var correoUsuario = document.getElementById('NomUsuario').textContent;

             // Filtrar las categorías basadas en el correo del usuario
            var categoriasUsuario = data.filter(item => item.correo === correoUsuario);

            // Llenar la tabla con los datos recibidos
            categoriasUsuario.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.idCategoria}</td>
                    <td>${item.tVeiculos}</td>
                    <td><button class="eliminar-button" data-id="${item.idCategoria}">Eliminar</button></td>
                `;
                tableBody.appendChild(row);
            });

            // Agregar event listener a los botones de eliminar
            document.querySelectorAll('.eliminar-button').forEach(button => {
                button.addEventListener('click', function () {
                    const id = button.getAttribute('data-id');
                    eliminarCategoria(id);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Función para eliminar una categoría
function eliminarCategoria(id) {
    // Realizar la solicitud HTTP DELETE para eliminar la categoría con el ID especificado
    fetch(`http://localhost:8080/ParkingSystem/EliminarCategoria/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la categoría');
            }
            return response.json();
        })
        .then(data => {
            console.log('Categoría eliminada:', data);
            // Recargar la página o actualizar la tabla
        })
        .catch(error => {
            console.error('Error al eliminar la categoría:', error);
        });
}
