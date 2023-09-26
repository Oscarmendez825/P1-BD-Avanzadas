import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';

@Component({
  selector: 'app-busqueda-colegas',
  templateUrl: './busqueda-colegas.component.html',
  styleUrls: ['./busqueda-colegas.component.css']
})
export class BusquedaColegasComponent {
  investigadores: Investigador[] = [
    {
      id: 1,
      nombreCompleto: 'Investigador 1',
      tituloAcademico: 'Doctor en Ciencias',
      institucion: 'Universidad A',
      correoElectronico: 'investigador1@example.com',
    },
    // Agrega más investigadores según sea necesario
  ];

  investigadorSeleccionado: Investigador | null = null;
  investigadoresColegas: Investigador[] = [];

  seleccionarInvestigador(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const investigadorSeleccionado = this.investigadores.find(investigador => investigador.nombreCompleto === selectedValue);
  
      if (investigadorSeleccionado) {
        this.investigadorSeleccionado = investigadorSeleccionado;
        // Simulamos la obtención de las investigaciones del investigador seleccionado.
        this.investigadoresColegas = [
          {
            "id": 1,
            "nombreCompleto": "Juan Pérez",
            "tituloAcademico": "Doctor en Ciencias",
            "institucion": "Universidad XYZ",
            "correoElectronico": "juan.perez@example.com"
          },
          {
            "id": 2,
            "nombreCompleto": "María Rodríguez",
            "tituloAcademico": "Licenciada en Biología",
            "institucion": "Instituto ABC",
            "correoElectronico": "maria.rodriguez@example.com"
          },
          {
            "id": 3,
            "nombreCompleto": "Carlos González",
            "tituloAcademico": "Máster en Física",
            "institucion": "Universidad 123",
            "correoElectronico": "carlos.gonzalez@example.com"
          }
          // Agrega más investigaciones según sea necesario
        ];
      }
    }
  }
}
