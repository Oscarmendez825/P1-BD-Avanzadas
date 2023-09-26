import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';

@Component({
  selector: 'app-busqueda-investigador',
  templateUrl: './busqueda-investigador.component.html',
  styleUrls: ['./busqueda-investigador.component.css']
})
export class BusquedaInvestigadorComponent {

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
  investigacionesInvestigador: Project[] = [];

  seleccionarInvestigador(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const investigadorSeleccionado = this.investigadores.find(investigador => investigador.nombreCompleto === selectedValue);
  
      if (investigadorSeleccionado) {
        this.investigadorSeleccionado = investigadorSeleccionado;
        // Simulamos la obtención de las investigaciones del investigador seleccionado.
        this.investigacionesInvestigador = [
          {
            titulo: 'Investigación 1',
            anio: 2020,
            duracion: 12,
            area: 'Ciencias',
          },
          // Agrega más investigaciones según sea necesario
        ];
      }
    }
  }
}
