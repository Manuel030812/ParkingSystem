package ParkingSystem.manu.servicio;

import ParkingSystem.manu.modelo.MCategoria;
import ParkingSystem.manu.repositorio.categoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServicio implements ICategoriaServicio {
    // metodos para hacer las peticiones a la base de datos
    @Autowired
    private categoriaRepositorio categoriarepositorio;

    @Override
    public List<MCategoria> listarCategoria(){return categoriarepositorio.findAll();}

    @Override
    public MCategoria BucarCategoria(Integer idCategoria) {
        MCategoria categoria = categoriarepositorio.findById(idCategoria).orElse(null);
        return categoria;
    }

    @Override
    public MCategoria guardarCategoria(MCategoria mCategoria) {
        return categoriarepositorio.save(mCategoria);
    }

    @Override
    public void eliminarCategoria(MCategoria mCategoria) {
        categoriarepositorio.delete(mCategoria);
    }
}
