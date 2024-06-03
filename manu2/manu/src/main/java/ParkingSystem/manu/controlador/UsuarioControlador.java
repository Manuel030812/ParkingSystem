package ParkingSystem.manu.controlador;

import ParkingSystem.manu.excepcion.RecursoNoEncontradoExcepcion;
import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.modelo.Usuario;
import ParkingSystem.manu.servicio.UsuarioServicio;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/ParkingSystem/
@RequestMapping("ParkingSystem")
@CrossOrigin(value = "http://localhost:5500")
public class UsuarioControlador {
    private static final Logger logger = LoggerFactory.getLogger(UsuarioControlador.class);
    @Autowired
    UsuarioServicio usuarioServicio;

    @GetMapping("/listarUsuario")
    public List<Usuario> ObtenerUsurios(){
        var usuario = usuarioServicio.listarUsuarios();
        usuario.forEach(( Usuario -> logger.info(Usuario.toString())));
        return usuario;
    }

    @PostMapping(value = "/agregarUsuario",produces= MediaType.APPLICATION_JSON_VALUE)
    public Usuario agregarUsuario(@RequestBody Usuario usuario){
        logger.info("Usuario agregado: "+ usuario);
        return usuarioServicio.guardarUsuario(usuario);
    }

    @DeleteMapping("/EliminarUsuario/{id}")
    public ResponseEntity<Map<String,Boolean>>
    eliminarUsuario(@PathVariable Integer id){
        Usuario usuario = usuarioServicio.BucarUsuario(id);
        if (usuario == null)
            throw new RecursoNoEncontradoExcepcion("el id recibido no existe:" +id);
        usuarioServicio.eliminarUsuario(usuario);
        //json {elinaar o no}
        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado",Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
    // Variable global para almacenar el correo electrónico
    private String correoGlobal;

    @PostMapping(value = "/iniciarSesion", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> iniciarSesion(@RequestBody Map<String, String> credenciales) {
        String correo = credenciales.get("correo_electronico");
        String contrasena = credenciales.get("contrasena");

        Usuario usuario = usuarioServicio.verificarCredenciales(correo, contrasena);
        Map<String, Object> respuesta = new HashMap<>();

        if (usuario != null) {
            respuesta.put("mensaje", "Inicio de sesión exitoso");
            respuesta.put("usuario", usuario);

            // Almacenar el correo electrónico globalmente
            correoGlobal = correo;

            // Imprimir en el log del servidor
            System.out.println("Correo electrónico guardado en la sesión: " + correo);

            return ResponseEntity.ok(respuesta);
        } else {
            respuesta.put("mensaje", "Correo electrónico o contraseña incorrectos");
            return ResponseEntity.status(401).body(respuesta);
        }
    }

    @GetMapping("/correo")
    public ResponseEntity<Map<String, String>> obtenerCorreo() {
        // Obtener el correo electrónico almacenado globalmente
        String correo = correoGlobal;
        // Imprimir en el log del servidor
        System.out.println("Correo electrónico guardado globalmente: " + correo);
        Map<String, String> respuesta = new HashMap<>();
        if (correo != null) {
            respuesta.put("correo", correo);
            return ResponseEntity.ok(respuesta);
        } else {
            respuesta.put("correo", "");
            return ResponseEntity.ok(respuesta);
        }
    }

    @PutMapping("/actualizarUsuario/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuarioActualizado) {
        Usuario usuario = usuarioServicio.BucarUsuario(id);
        if (usuario == null) {
            throw new RecursoNoEncontradoExcepcion("El usuario con ID " + id + " no fue encontrado");
        }
        // Actualizar los datos del usuario existente
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setCorreoElectronico(usuarioActualizado.getCorreoElectronico());
        usuario.setContrasena(usuarioActualizado.getContrasena());
        correoGlobal = usuarioActualizado.getCorreoElectronico();

        // Guardar los cambios en la base de datos
        Usuario usuarioActualizadoBD = usuarioServicio.guardarUsuario(usuario);


        return ResponseEntity.ok(usuarioActualizadoBD);
    }


}
