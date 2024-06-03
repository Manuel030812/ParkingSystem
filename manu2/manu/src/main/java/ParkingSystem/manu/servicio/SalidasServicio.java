package ParkingSystem.manu.servicio;
import ParkingSystem.manu.modelo.MSalidas;
import ParkingSystem.manu.repositorio.SalidasRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.List;

@Service
public class SalidasServicio implements ISalidasServicio {
    // metodos para hacer las peticiones a la base de datos
    @Autowired
    private SalidasRepositorio salidaRepositorio;
    @Override
    public List<MSalidas> listarSalidas() {
        return salidaRepositorio.findAll();
    }

    @Override
    public MSalidas BucarSalidas(Integer idSalidas) {
        MSalidas salidas = salidaRepositorio.findById(idSalidas).orElse(null);
        return salidas;
    }

    @Override
    public MSalidas guardarSalidas(MSalidas mSalidas) {
        return salidaRepositorio.save(mSalidas);
    }

    @Override
    public void eliminarSalidas(MSalidas mSalidas) {
        salidaRepositorio.delete(mSalidas);
    }

}
