package ParkingSystem.manu.servicio;

import ParkingSystem.manu.modelo.MCategoria;

import java.util.List;

public interface ICategoriaServicio {
    public List<MCategoria> listarCategoria();

    public MCategoria BucarCategoria(Integer idCategoria);

    public  MCategoria guardarCategoria(MCategoria mCategoria);

    public void eliminarCategoria(MCategoria mCategoria);

}
