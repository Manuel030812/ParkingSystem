package ParkingSystem.manu.servicio;

import ParkingSystem.manu.modelo.Usuario;
import ParkingSystem.manu.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioServicio implements IUsuariosServicios{
    // metodos para hacer las peticiones a la base de datos
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @Override
    public Usuario BucarUsuario(Integer idUsuario) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario).orElse(null);
        return usuario;
    }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @Override
    public void eliminarUsuario(Usuario usuario) {
        usuarioRepositorio.delete(usuario);
    }

    @Override
    public Usuario verificarCredenciales(String correoElectronico, String contrasena) {
        return usuarioRepositorio.findByCorreoElectronicoAndContrasena(correoElectronico, contrasena);
    }
}
