document.addEventListener('DOMContentLoaded', function () {
    // Realizar la solicitud HTTP GET para obtener las categorías
    fetch('http://localhost:8080/ParkingSystem/ListarCategoria')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            // Obtener el select de tipo de vehículo
            const selectTipoVehiculo = document.getElementById('tipo-vehiculo-input');
            
            // Llenar el select con las opciones de tipo de vehículo
            var correoUsuario = document.getElementById('NomUsuario').textContent;

            // Filtrar las categorías basadas en el correo del usuario
            var categoriasUsuario = data.filter(item => item.correo === correoUsuario);

            // Llenar la tabla con los datos recibidos
            categoriasUsuario.forEach(item => {
                // Crear una opción para cada tipo de vehículo
                const option = document.createElement('option');
                option.value = item.tVeiculos; // Valor de la opción
                option.textContent = item.tVeiculos; // Texto visible de la opción
                selectTipoVehiculo.appendChild(option);
            });
            
            // Agregar un event listener al select para actualizar el campo de entrada de precio
            selectTipoVehiculo.addEventListener('change', function() {
                // Obtener el valor seleccionado del select
                const selectedType = selectTipoVehiculo.value;
                
                // Buscar la categoría correspondiente al tipo seleccionado
                const category = data.find(item => item.tVeiculos === selectedType);
                
                // Actualizar el campo de entrada de precio con el cargo por hora de la categoría
                document.getElementById('precio-input').value = category.cargoxHora;
                
                // Obtener el límite de vehículos para la categoría seleccionada
                const limit = category.limitesVeiculos;
                
                // Obtener los números de parking ocupados
                fetch('http://localhost:8080/ParkingSystem/ListarEntrada')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al obtener los datos');
                        }
                        return response.json();
                    })
                    .then(entradas => {
                        // Obtener el select de número de parking
                        const selectNumeroParking = document.getElementById('numero-parking-input');
                        
                        // Limpiar el select antes de llenarlo nuevamente
                        selectNumeroParking.innerHTML = '';
                        
                        // Crear un conjunto para almacenar los números de parking ocupados
                        const numerosOcupados = new Set();
                        var correoUsuario = document.getElementById('NomUsuario').textContent;

                        // Filtrar las categorías basadas en el correo del usuario
                        var categoriasUsuario = entradas.filter(item => item.correo === correoUsuario);

                        // Llenar la tabla con los datos recibidos
                        categoriasUsuario.forEach(item => {
                            if (item.tVeiculos === selectedType) {
                                numerosOcupados.add(item.NParking);
                            }
                        });
                        
                        // Llenar el select de número de parking con opciones del 1 al límite
                        for (let i = 1; i <= limit; i++) {
                            // Si el número de parking no está ocupado, agregarlo como opción
                            if (!numerosOcupados.has(i)) {
                                const option = document.createElement('option');
                                option.value = i; // Valor de la opción
                                option.textContent = i; // Texto visible de la opción
                                selectNumeroParking.appendChild(option);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos de entradas:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de categorías:', error);
        });

    // Función para actualizar la tabla de entradas
    function actualizarTabla() {
        fetch('http://localhost:8080/ParkingSystem/ListarEntrada')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            // Llenar la tabla con los datos recibidos
            const tableBody = document.querySelector('#categoria-table tbody');
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
                    <td>${item.NParking}</td>
                    <td>${item.tVeiculos}</td>
                    <td>${item.cargoxHora}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Event listener para el botón de enviar
    document.getElementById('enviar-button').addEventListener('click', function () {
        // Capturar los valores de los campos de entrada
        var placa = document.getElementById('placa-input').value;
        var tipoVehiculo = document.getElementById('tipo-vehiculo-input').value;
        var numeroParking = document.getElementById('numero-parking-input').value;
        var precio = document.getElementById('Totalpagar').value;
        
        // Obtener la fecha y hora actual
        var fechaHoraActual = new Date().toISOString(); // Formato: 'YYYY-MM-DDTHH:MM:SSZ'
        var correo = document.getElementById('NomUsuario').textContent;
        // Validar que los campos no estén vacíos
        if (!placa || !tipoVehiculo || !numeroParking || !precio) {
            console.log('Todos los campos son obligatorios');
            alert("todos los datos son obligatorios");
            return;
        }
        
        // Construir el objeto de datos a enviar al backend
        var data = {
            Placa: placa,
            tVeiculos: tipoVehiculo,
            NParking: numeroParking,
            cargoxHora: precio,
            HoraLlegada: fechaHoraActual,
            correo: correo // Agregar la fecha y hora actual al objeto de datos
        };
    
        // Enviar la solicitud HTTP POST al backend
        fetch('http://localhost:8080/ParkingSystem/agregarEntrada', {
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
            alert("Datos enviados exitosamente:");
            
            // Eliminar el número de parking seleccionado de las opciones disponibles
            const selectNumeroParking = document.getElementById('numero-parking-input');
            selectNumeroParking.removeChild(selectNumeroParking.querySelector(`option[value="${numeroParking}"]`));

            // Enviar solicitud para encender el Arduino
            return fetch('http://localhost:8080/ParkingSystem/encender', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                //throw new Error('Error al encender el Arduino');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            
            // Actualizar la tabla después de agregar la entrada
            actualizarTabla();
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor o encender el Arduino:', error);
        });
    });

    // Realizar la solicitud HTTP GET para listar entradas al cargar la página
    actualizarTabla();

    // Event listener para el cambio en la selección del tipo de tiempo
    document.getElementById('Selecionhdsm').addEventListener('change', function() {
        // Obtener el valor seleccionado del tipo de tiempo
        const selectedType = document.getElementById('Selecionhdsm').value;
        
        // Limpiar el select de límites
        const selectLimite = document.getElementById('CalculoHDSM');
        selectLimite.innerHTML = ''; // Limpiar opciones anteriores
        
        // Crear opciones según el tipo de tiempo seleccionado
        switch(selectedType) {
            case 'horas':
                // Añadir 24 opciones para las horas
                for (let i = 1; i <= 24; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    selectLimite.appendChild(option);
                }
                // Si se selecciona "horas", habilitar el evento de cambio para calcular el total
                document.getElementById('CalculoHDSM').addEventListener('change', function() {
                    // Obtener el precio por hora y el número de horas seleccionado
                    const precioPorHora = parseFloat(document.getElementById('precio-input').value);
                    const horasSeleccionadas = parseInt(document.getElementById('CalculoHDSM').value);
                    
                    // Calcular el total a pagar
                    const totalPagar = precioPorHora * horasSeleccionadas;
                    
                    // Mostrar el total en el campo correspondiente
                    document.getElementById('Totalpagar').value = totalPagar;
                });
                break;
            case 'Dias':
                // Añadir 30 días como opciones
                for (let i = 1; i <= 30; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    selectLimite.appendChild(option);
                }
                // Si se selecciona "Días", habilitar el evento de cambio para calcular el total
                document.getElementById('CalculoHDSM').addEventListener('change', function() {
                    // Obtener el precio por día y la cantidad de días seleccionados
                    const precioPorDia = parseFloat(document.getElementById('precio-input').value);
                    const diasSeleccionados = parseInt(document.getElementById('CalculoHDSM').value);
                    
                    // Calcular el total a pagar multiplicando el precio por día por 24 horas (cada día)
                    const totalPagar = precioPorDia * diasSeleccionados * 24;
                    
                    // Mostrar el total en el campo correspondiente
                    document.getElementById('Totalpagar').value = totalPagar;
                });
                break;
            case 'semanas':
                // Añadir 4 semanas como opciones
                for (let i = 1; i <= 4; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    selectLimite.appendChild(option);
                }
                // Si se selecciona "Semanas", habilitar el evento de cambio para calcular el total
                document.getElementById('CalculoHDSM').addEventListener('change', function() {
                    // Obtener el precio por hora y la cantidad de semanas seleccionadas
                    const precioPorHora = parseFloat(document.getElementById('precio-input').value);
                    const semanasSeleccionadas = parseInt(document.getElementById('CalculoHDSM').value);
                    
                    // Calcular el total a pagar multiplicando el precio por hora por la cantidad de horas en una semana (7 días * 24 horas)
                    const totalPagar = precioPorHora * semanasSeleccionadas * 24 * 7;
                    
                    // Mostrar el total en el campo correspondiente
                    document.getElementById('Totalpagar').value = totalPagar;
                });
                break;
            case 'meses':
                // Añadir 12 meses como opciones
                for (let i = 1; i <= 12; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    selectLimite.appendChild(option);
                }
                // Si se selecciona "Meses", habilitar el evento de cambio para calcular el total
                document.getElementById('CalculoHDSM').addEventListener('change', function() {
                    // Obtener el precio por hora y la cantidad de meses seleccionados
                    const precioPorHora = parseFloat(document.getElementById('precio-input').value);
                    const mesesSeleccionados = parseInt(document.getElementById('CalculoHDSM').value);
                    
                    // Calcular el total a pagar multiplicando el precio por hora por la cantidad de horas en un mes
                    // Tomando en cuenta que un mes tiene aproximadamente 30 días
                    const totalPagar = precioPorHora * mesesSeleccionados * 24 * 30;
                    
                    // Mostrar el total en el campo correspondiente
                    document.getElementById('Totalpagar').value = totalPagar;
                });
                break;
            default:
                // Mostrar un mensaje si no se selecciona nada
                const option = document.createElement('option');
                option.textContent = 'Seleccione una opción válida';
                selectLimite.appendChild(option);
        }
    });

});
