function imprimirDatos(data) {
  data.forEach(item => {
    console.log(`
      ID de Categoría: ${item.idCategoria}
      Área: ${item.area}
      Límite de Vehículos: ${item.limiteVehiculos}
      Tipo de Vehículos: ${item.tipoVehiculos}
      Cargo por Hora: ${item.cargoxHora}
      Fecha: ${item.fecha}
    `);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  function llenarTablaEntradas() {
    // Realizar la solicitud HTTP GET
    fetch('http://localhost:8080/ParkingSystem/ListarEntrada')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Llenar la tabla con los datos recibidos
        const tableBody = document.querySelector('#tablaSalida tbody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        var correoUsuario = document.getElementById('NomUsuario').textContent;

        // Filtrar las categorías basadas en el correo del usuario
        var categoriasUsuario = data.filter(item => item.correo === correoUsuario);

        // Llenar la tabla con los datos recibidos
        categoriasUsuario.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.IdEntrada}</td>
            <td>${item.Placa}</td>
            <td>${item.tVeiculos}</td>
            <td>${item.NParking}</td>
            <td>${item.cargoxHora}</td>
            <td>${item.HoraLlegada}</td> <!-- Agregar columna para la fecha -->
            <td><button onclick="salida(${item.IdEntrada},'${item.Placa}','${item.tVeiculos}',${item.NParking},${item.cargoxHora},'${item.HoraLlegada}')">Salir</button></td> <!-- Botón de salida -->
          `;
          tableBody.appendChild(row);
        });

        // Imprimir los datos en la consola
        imprimirDatos(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Función para el botón de salida
  function salida(idEntrada, placa, tVeiculos, nParking, cargoxHora, horaLlegada) {
    // Realizar la solicitud HTTP DELETE para eliminar la entrada
    fetch(`http://localhost:8080/ParkingSystem/EliminarEntradas/${idEntrada}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar la entrada');
      }
      return response.json();
    })
    .then(data => {
      var correo = document.getElementById('NomUsuario').textContent;

      console.log(data); // Mensaje de confirmación
      // Realizar la solicitud HTTP POST para agregar la salida
      fetch('http://localhost:8080/ParkingSystem/agregarSalidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Placa: placa,
          tVeiculos: tVeiculos,
          NParking: nParking,
          cargoxHora: cargoxHora,
          HoraLlegada: horaLlegada,
          correo: correo
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar la salida');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Mensaje de confirmación
        alert("Se ha retirado del estacionamiento");
        // Recargar la tabla después de agregar la salida
        llenarTablaEntradas();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Llenar la tabla cuando se cargue la página
  llenarTablaEntradas();

  // Hacer la función `salida` accesible desde el ámbito global
  window.salida = salida;
});
