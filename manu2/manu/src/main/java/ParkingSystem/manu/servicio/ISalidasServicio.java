package ParkingSystem.manu.servicio;

import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.modelo.MSalidas;

import java.util.List;

public interface ISalidasServicio {
    public List<MSalidas> listarSalidas();

    public MSalidas BucarSalidas(Integer idSalida);

    public  MSalidas guardarSalidas(MSalidas mSalidas);

    public void eliminarSalidas(MSalidas mSalidas);
}
