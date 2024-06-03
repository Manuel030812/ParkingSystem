document.addEventListener('DOMContentLoaded', function() {
    const buscarInput = document.getElementById('buscar');

    buscarInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const placa = buscarInput.value.trim();
            if (placa) {
                buscarPorPlaca(placa);
            }
        }
    });
});

function buscarPorPlaca(placa) {
    fetch(`http://localhost:8080/ParkingSystem/buscarEntrada/${placa}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se encontró la placa: ${placa}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Imprimir los datos en la consola
            actualizarTabla(data);
        })
}

function actualizarTabla(entrada) {
    const tbody = document.querySelector('#categoria-table tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = entrada.IdEntrada; // Añadir ID de entrada
    row.appendChild(idCell);

    const placaCell = document.createElement('td');
    placaCell.textContent = entrada.Placa;
    row.appendChild(placaCell);

    const lugarCell = document.createElement('td');
    lugarCell.textContent = entrada.NParking;
    row.appendChild(lugarCell);

    const tipoCell = document.createElement('td');
    tipoCell.textContent = entrada.tVeiculos;
    row.appendChild(tipoCell);

    const cargoCell = document.createElement('td');
    cargoCell.textContent = entrada.cargoxHora;
    row.appendChild(cargoCell);

    // Crear la celda de la columna de acción
    const accionCell = document.createElement('td');
    const salirButton = document.createElement('button');
    salirButton.textContent = 'Salir';
    salirButton.addEventListener('click', function() {
        salida(entrada.IdEntrada, entrada.placa, entrada.tVeiculos, entrada.nParking, entrada.cargoxHora, entrada.horaLlegada);
    });
    accionCell.appendChild(salirButton);
    row.appendChild(accionCell);

    tbody.appendChild(row);
}
function salida(idEntrada, placa, tVeiculos, NParking, cargoxHora, horaLlegada) {
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
          placa: placa,
          tVeiculos: tVeiculos,
          nParking: NParking,
          cargoxHora: cargoxHora,
          horaLlegada: horaLlegada,
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
        alert("se ha retirado del estacionamiento");
        // Actualizar la tabla después de la salida
        buscarPorPlaca(placa);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
