package ParkingSystem.manu.controlador;
import ParkingSystem.manu.excepcion.RecursoNoEncontradoExcepcion;
import ParkingSystem.manu.modelo.MCategoria;
import ParkingSystem.manu.modelo.MEntradas;
import ParkingSystem.manu.servicio.EntradasServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/ParkingSystem/
@RequestMapping("ParkingSystem")
@CrossOrigin(value = "http://localhost:5500")
public class EntradaControlador {

    private static final Logger logger = LoggerFactory.getLogger(EntradaControlador.class);

    @Autowired
    EntradasServicio entradasServicio;

    @GetMapping("/ListarEntrada")
    public List<MEntradas> ObtenerCategoria(){
        var entradas = entradasServicio.listarEntradas();
        entradas.forEach(( mCategoria -> logger.info(mCategoria.toString())));
        return entradas;
    }

    @PostMapping(value = "/agregarEntrada",produces= MediaType.APPLICATION_JSON_VALUE)
    public MEntradas agregarEntrada(@RequestBody MEntradas mEntradas){
        logger.info("categoria agregada: "+ mEntradas);
        return entradasServicio.guardarEntradas(mEntradas);
    }

    @DeleteMapping("/EliminarEntradas/{id}")
    public ResponseEntity<Map<String,Boolean>>
    eliminarEntrada(@PathVariable Integer id){
        MEntradas entrada = entradasServicio.BucarEntradasid(id);
        if (entrada == null)
            throw new RecursoNoEncontradoExcepcion("el id recibido no existe:" +id);
        entradasServicio.eliminarEntradas(entrada);
        //json {elinaar o no}
        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado",Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/buscarEntrada/{placa}")
    public ResponseEntity<MEntradas>
    obtenerCategoria(@PathVariable String placa){
        MEntradas entradas = entradasServicio.BucarEntradas(placa);
        if (entradas ==null)
            throw new RecursoNoEncontradoExcepcion("no se encontro el placa: "+placa);
        return ResponseEntity.ok(entradas);
    }

}
