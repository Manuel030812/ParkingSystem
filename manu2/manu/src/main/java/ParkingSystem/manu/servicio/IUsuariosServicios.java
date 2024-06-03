package ParkingSystem.manu.servicio;


import ParkingSystem.manu.modelo.Usuario;

import java.util.List;

public interface IUsuariosServicios {
    public List<Usuario> listarUsuarios();

    public Usuario BucarUsuario(Integer idUsuario);

    public  Usuario guardarUsuario(Usuario usuario);

    public void eliminarUsuario(Usuario usuario);
    Usuario verificarCredenciales(String correoElectronico, String contrasena);
}
