package ParkingSystem.manu.controlador;

import ParkingSystem.manu.excepcion.RecursoNoEncontradoExcepcion;
import ParkingSystem.manu.modelo.MCategoria;
import ParkingSystem.manu.servicio.CategoriaServicio;
import jakarta.persistence.criteria.CriteriaBuilder;
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
public class CategoriaControlador {
    private static final Logger logger = LoggerFactory.getLogger(CategoriaControlador.class);

    @Autowired
    CategoriaServicio categoriaServicio;

    //motara un select
    @GetMapping("/ListarCategoria")
    public List<MCategoria> ObtenerCategoria(){
        var categoria = categoriaServicio.listarCategoria();
        categoria.forEach(( mCategoria -> logger.info(mCategoria.toString())));
        return categoria;
    }

    //agregar
    @PostMapping(value = "/agregarCategoria",produces= MediaType.APPLICATION_JSON_VALUE)
    public MCategoria agregarCategoria(@RequestBody MCategoria mCategoria){
        logger.info("categoria agregada: "+ mCategoria);
        return categoriaServicio.guardarCategoria(mCategoria);
    }
    //bucar
    @GetMapping("/buscarCategoria/{id}")
    public ResponseEntity<MCategoria>
    obtenerCategoria(@PathVariable Integer id){
        MCategoria categoria = categoriaServicio.BucarCategoria(id);
        if (categoria ==null)
            throw new RecursoNoEncontradoExcepcion("no se encontro el id: "+id);
        return ResponseEntity.ok(categoria);
    }

    //modificar
    @PutMapping("/ModificarCategoria/{id}")
    public ResponseEntity<MCategoria>
    actualizarCategoria(@PathVariable Integer id,@RequestBody MCategoria CategoriaRecivida){
        MCategoria categoria = categoriaServicio.BucarCategoria(id);
        if (categoria == null)
            throw new RecursoNoEncontradoExcepcion("");
        categoria.setArea(CategoriaRecivida.getArea());
        categoria.setTVeiculos(CategoriaRecivida.getTVeiculos());
        categoria.setLimitesVeiculos(CategoriaRecivida.getLimitesVeiculos());
        categoria.setCargoxHora(CategoriaRecivida.getCargoxHora());
        categoriaServicio.guardarCategoria(categoria);
        return ResponseEntity.ok(categoria);
    }

    //eliminar
    @DeleteMapping("/EliminarCategoria/{id}")
    public ResponseEntity<Map<String,Boolean>>
        eliminarCategoria(@PathVariable Integer id){
        MCategoria categoria = categoriaServicio.BucarCategoria(id);
        if (categoria == null)
            throw new RecursoNoEncontradoExcepcion("el id recibido no existe:" +id);
        categoriaServicio.eliminarCategoria(categoria);
        //json {elinaar o no}
        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado",Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }


}
