package ParkingSystem.manu.WebConfigure;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Configuración para permitir solicitudes CORS
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Define las reglas para el intercambio de recursos entre diferentes dominios (CORS)
        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5500") // Permitir solicitudes desde este origen
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Permitir estos métodos HTTP
                .allowedHeaders("*"); // Permitir todos los encabezados
    }
}
