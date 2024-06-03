package ParkingSystem.manu.controlador;
import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.modelo.MSalidas;
import ParkingSystem.manu.servicio.EntradasServicio;
import ParkingSystem.manu.servicio.SalidasServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//http://localhost:8080/ParkingSystem/
@RequestMapping("ParkingSystem")
@CrossOrigin(value = "http://localhost:5500")
public class SalidaControlador {

    private static final Logger logger = LoggerFactory.getLogger(SalidaControlador.class);

    @Autowired
    SalidasServicio salidasServicio;

    @GetMapping("/ListarSalidas")
    public List<MSalidas> ObtenerSalidas(){
        var salidas = salidasServicio.listarSalidas();
        salidas.forEach(( mSalidas -> logger.info(mSalidas.toString())));
        return salidas;
    }

    @PostMapping(value = "/agregarSalidas",produces= MediaType.APPLICATION_JSON_VALUE)
    public MSalidas agregarSalidas(@RequestBody MSalidas mSalidas){
        logger.info("categoria agregada: "+ mSalidas);
        return salidasServicio.guardarSalidas(mSalidas);
    }

}
