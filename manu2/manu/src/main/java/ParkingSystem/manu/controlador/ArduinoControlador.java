package ParkingSystem.manu.controlador;

import com.panamahitek.ArduinoException;
import com.panamahitek.PanamaHitek_Arduino;
import jssc.SerialPortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//http://localhost:8080/ParkingSystem/
@RequestMapping("ParkingSystem")
@CrossOrigin(value = "http://localhost:5500")
public class ArduinoControlador {

    @Autowired
    private PanamaHitek_Arduino arduino;

    @PostMapping("/encender")
    public String encender() {
        try {
            arduino.sendData("E");
        } catch (ArduinoException | SerialPortException ex) {
            ex.printStackTrace();
            return "Error";
        }
        return "Encendido";
    }

}
