package ParkingSystem.manu.controlador;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
//http://localhost:8080/ParkingSystem/
@RequestMapping("ParkingSystem")
public class ControladorVistas {
    @GetMapping("/Inicio")
    public String vermipantalla(){

        return "hola";
    }


}
