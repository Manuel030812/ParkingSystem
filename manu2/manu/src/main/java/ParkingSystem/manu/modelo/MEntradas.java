package ParkingSystem.manu.modelo;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MEntradas {
    //id es para decir que en la base de datos
    /*que el primer atributo es el id la primary key
    * y el generated vauel es para que se aumente solo
    * joson p es para como va hacer llamado en el js
    * y pues lo demas es la declaracion de variables*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("IdEntrada")
    private Integer IdEntrada;
    @JsonProperty("Placa")
    private String placa;
    @JsonProperty("tVeiculos")
    private String tVeiculos;
    @JsonProperty("NParking")
    private Integer NParking;
    @JsonProperty("HoraLlegada")
    private Date HoraLlegada;
    @JsonProperty("cargoxHora")
    private Double cargoxHora;
    @JsonProperty("correo")
    private String correo;


}
