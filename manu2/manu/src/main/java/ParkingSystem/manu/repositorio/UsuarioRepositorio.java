package ParkingSystem.manu.repositorio;
import ParkingSystem.manu.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


// Repositorio para la entidad Usuario
public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {
    // Método para buscar un usuario por su correo electrónico y contraseña
    Usuario findByCorreoElectronicoAndContrasena(String correoElectronico, String contrasena);

}
