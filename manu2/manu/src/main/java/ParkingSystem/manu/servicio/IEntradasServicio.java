package ParkingSystem.manu.servicio;

import ParkingSystem.manu.modelo.MCategoria;
import ParkingSystem.manu.modelo.MEntradas;

import java.util.List;

public interface IEntradasServicio {
    public List<MEntradas> listarEntradas();

    public MEntradas BucarEntradasid(Integer id);

    public MEntradas BucarEntradas(String Placa);

    public  MEntradas guardarEntradas(MEntradas mEntradas);

    public void eliminarEntradas(MEntradas mEntradas);

}
