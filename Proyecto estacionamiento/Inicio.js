document.addEventListener('DOMContentLoaded', function () {

    // Realizar la solicitud HTTP GET para obtener la lista de entradas
    fetch('http://localhost:8080/ParkingSystem/ListarEntrada')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de entradas');
            }
            return response.json();
        })
        .then(entradas => {
            // Obtener el correo del usuario
            var correoUsuario = document.getElementById('NomUsuario').textContent;

            // Obtener el elemento donde deseas mostrar el número total de entradas
            const totalEntradasElement = document.querySelector('.total-parking-capacity');

            // Filtrar las entradas por el correo del usuario
            var entradasUsuario = entradas.filter(entrada => entrada.correo === correoUsuario);

            // Calcular el número total de entradas para el usuario
            var totalEntradasUsuario = entradasUsuario.length;

            // Actualizar el contenido del elemento con el número total de entradas
            totalEntradasElement.textContent = totalEntradasUsuario;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el correo del usuario
    var correoUsuario = document.getElementById('NomUsuario').textContent;

    // Obtener el elemento donde deseas mostrar el número total de salidas
    const totalSalidasElement = document.querySelector('.total-registered-vehicles');

    // Realizar la solicitud HTTP GET para obtener la lista de salidas
    fetch('http://localhost:8080/ParkingSystem/ListarSalidas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de salidas');
            }
            return response.json();
        })
        .then(salidas => {
            // Filtrar las salidas por el correo del usuario
            var salidasUsuario = salidas.filter(salida => salida.correo === correoUsuario);

            // Calcular el número total de salidas para el usuario
            var totalSalidasUsuario = salidasUsuario.length;

            // Actualizar el contenido del elemento con el número total de salidas
            totalSalidasElement.textContent = totalSalidasUsuario;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



document.addEventListener('DOMContentLoaded', function () {
    // Realizar la solicitud HTTP GET para obtener las salidas
    fetch('http://localhost:8080/ParkingSystem/ListarEntrada')
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

            // Función para calcular la suma de la ganancia
            function calcularSumaGanancia(salidas) {
                let sumaGanancia = 0;
                salidas.forEach(salida => {
                    sumaGanancia += salida.cargoxHora;
                });
                return sumaGanancia.toFixed(2); // Redondear la suma a dos decimales
            }

            // Función para actualizar la suma de la ganancia en el HTML
            function actualizarSumaGanancia(salidas) {
                const sumaGanancia = calcularSumaGanancia(salidas);
                document.querySelector('.total-available-capacity').textContent = sumaGanancia;
            }

            // Llamar a la función para actualizar la suma de la ganancia
            actualizarSumaGanancia(categoriasUsuario);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});





document.addEventListener('DOMContentLoaded', function () {
    // Obtener el correo del usuario
    const correoUsuario = document.getElementById('NomUsuario').textContent.trim();

    // Obtener los elementos donde se mostrarán los números
    const totalEntradasElement = document.querySelector('.total-parking-capacity');
    const totalSalidasElement = document.querySelector('.total-registered-vehicles');
    const totalServicesSummaryElement = document.getElementById('regisTotales');

    // Función para actualizar el contenido de un elemento con un número
    function actualizarElemento(elemento, numero) {
        elemento.textContent = numero;
    }

    // Realizar las solicitudes HTTP GET en paralelo
    Promise.all([
        fetch('http://localhost:8080/ParkingSystem/ListarEntrada').then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de entradas');
            }
            return response.json();
        }),
        fetch('http://localhost:8080/ParkingSystem/ListarSalidas').then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de salidas');
            }
            return response.json();
        })
    ])
    .then(([entradas, salidas]) => {
        const correoUsuario = document.getElementById('NomUsuario').textContent.trim();

        // Filtrar las listas por el correo del usuario
        const entradasUsuario = entradas.filter(entrada => entrada.correo === correoUsuario);
        const salidasUsuario = salidas.filter(salida => salida.correo === correoUsuario);

        // Calcular los números totales
        const totalEntradasUsuario = entradasUsuario.length;
        const totalSalidasUsuario = salidasUsuario.length;
        const totalServiciosUsuario = totalEntradasUsuario + totalSalidasUsuario;

        // Actualizar los elementos individuales
        actualizarElemento(totalEntradasElement, totalEntradasUsuario);
        actualizarElemento(totalSalidasElement, totalSalidasUsuario);

        // Actualizar el elemento total
        actualizarElemento(totalServicesSummaryElement, totalServiciosUsuario);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
