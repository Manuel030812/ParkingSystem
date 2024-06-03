package ParkingSystem.manu.repositorio;
import ParkingSystem.manu.modelo.MCategoria;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio para la entidad MCategoria
public interface categoriaRepositorio  extends JpaRepository<MCategoria, Integer> {

}
