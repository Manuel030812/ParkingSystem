package ParkingSystem.manu.ArduinoConfiguracion;

import com.panamahitek.ArduinoException;
import com.panamahitek.PanamaHitek_Arduino;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArduinoConfig {
    @Bean
    public PanamaHitek_Arduino arduino() {
        PanamaHitek_Arduino arduino = new PanamaHitek_Arduino();
        try {
            arduino.arduinoTX("COM10", 9600);
        } catch (ArduinoException ex) {
            ex.printStackTrace();
        }
        return arduino;
    }
}
