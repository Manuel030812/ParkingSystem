package ParkingSystem.manu.servicio;
import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.repositorio.EntradasRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.List;

@Service
public class EntradasServicio implements IEntradasServicio {
    // metodos para hacer las peticiones a la base de datos
    @Autowired
    private EntradasRepositorio entrdasRepositorio;
    @Override
    public List<MEntradas> listarEntradas() {
        return entrdasRepositorio.findAll();
    }

    @Override
    public MEntradas BucarEntradasid(Integer id) {
        MEntradas entradas = entrdasRepositorio.findById(id).orElse(null);
        return entradas;
    }

    @Override
    public MEntradas BucarEntradas(String Placa) {
        MEntradas entradas = entrdasRepositorio.findByPlaca(Placa).orElse(null);
        return entradas;
    }

    @Override
    public MEntradas guardarEntradas(MEntradas mEntradas) {
        return entrdasRepositorio.save(mEntradas);
    }

    @Override
    public void eliminarEntradas(MEntradas mEntradas) {
        entrdasRepositorio.delete(mEntradas);
    }

}
