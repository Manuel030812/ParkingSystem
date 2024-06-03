package ParkingSystem.manu.repositorio;
import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.modelo.MSalidas;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio para la entidad Msalidas
public interface SalidasRepositorio extends JpaRepository<MSalidas, Integer> {
}
