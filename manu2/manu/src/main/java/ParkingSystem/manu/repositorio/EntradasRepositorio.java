package ParkingSystem.manu.repositorio;
import ParkingSystem.manu.modelo.MEntradas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repositorio para la entidad Mentradas
public interface EntradasRepositorio extends JpaRepository<MEntradas, Integer> {
    // Método para buscar una entrada por la placa del vehículo
    Optional<MEntradas> findByPlaca(String placa);

}
