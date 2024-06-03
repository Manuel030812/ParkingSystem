document.addEventListener('DOMContentLoaded', function () {
    // Realizar una solicitud HTTP GET para obtener los datos del usuario
    fetch('http://localhost:8080/ParkingSystem/listarUsuario')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario');
            }
            return response.json();
        })
        .then(usuarios => {
            // Obtener el correo electrónico del usuario actualmente autenticado
            const correoUsuario = document.getElementById('NomUsuario').textContent;

            // Filtrar los usuarios encontrados que coinciden con el correo electrónico del usuario actual
            const usuarioEncontrado = usuarios.find(usuario => usuario.Correo_Electronico === correoUsuario);

            if (usuarioEncontrado) {
                // Rellenar los campos de entrada con los datos del usuario encontrado
                document.getElementById('idUsuario').value = usuarioEncontrado.IdUsuario;
                document.getElementById('nom_Usuario').value = usuarioEncontrado.Nombre;
                document.getElementById('emailUsuario').value = usuarioEncontrado.Correo_Electronico;
                document.getElementById('ContraseniaUsuario').value = usuarioEncontrado.Contrasena;
            } else {
                console.error('No se encontró ningún usuario con el correo electrónico actual');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });

    // Obtener referencia al botón de "Actualizar"
    const actualizarButton = document.getElementById('enviar-button');
    
    // Escuchar el evento clic en el botón de "Actualizar"
    actualizarButton.addEventListener('click', function() {
        // Obtener los valores actualizados de los campos de entrada
        const id = document.getElementById('idUsuario').value.trim();
        const nombre = document.getElementById('nom_Usuario').value.trim();
        const correo = document.getElementById('emailUsuario').value.trim();
        const contrasena = document.getElementById('ContraseniaUsuario').value.trim();
        
        // Verificar que los campos no estén vacíos
        if (nombre && correo && contrasena) {
            // Crear un objeto con los datos del usuario actualizados
            const usuarioActualizado = {
                IdUsuario: id,
                Nombre: nombre,
                Correo_Electronico: correo,
                Contrasena: contrasena
            };
            
            // Realizar la solicitud PUT al servidor para actualizar el usuario
            fetch(`http://localhost:8080/ParkingSystem/actualizarUsuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioActualizado)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el usuario');
                }
                return response.json();
            })
            .then(data => {
                console.log('Usuario actualizado:', data);
                alert('Usuario actualizado exitosamente');
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
        } else {
            alert('Por favor completa todos los campos');
        }
    });
});


