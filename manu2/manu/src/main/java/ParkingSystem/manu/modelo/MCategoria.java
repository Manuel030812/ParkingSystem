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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MCategoria{
	//id es para decir que en la base de datos
	/*que el primer atributo es el id la primary key
	 * y el generated vauel es para que se aumente solo
	 * joson p es para como va hacer llamado en el js
	 * y pues lo demas es la declaracion de variables*/
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idCategoria;
	private String area;
	@JsonProperty("tVeiculos")
	private String tVeiculos;
	private Integer limitesVeiculos;
	private Double cargoxHora;
	private String correo;

	

}
