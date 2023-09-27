import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';

@Component({
  selector: 'app-asociar-investigador',
  templateUrl: './asociar-investigador.component.html',
  styleUrls: ['./asociar-investigador.component.css']
})
export class AsociarInvestigadorComponent {
  investigadores: Investigador[] = [
    {
      id: 1,
      nombreCompleto: 'Investigador 1',
      tituloAcademico: 'PhD',
      institucion: 'Universidad A',
      correoElectronico: 'investigador1@example.com'
    },
    // Agrega más investigadores aquí
  ];

  proyectos: Project[] = [
    {
      titulo: 'Proyecto 1',
      anio: 2023,
      duracion: 2,
      area: 'Ciencia'
    },
    // Agrega más proyectos aquí
  ];
  selectedInvestigador: number | undefined;
  selectedProyecto: string | undefined;
  isButtonDisabled: boolean = true; // Inicialmente, el botón estará deshabilitado


  checkFormValidity(): void {
    this.isButtonDisabled = !(this.selectedInvestigador && this.selectedProyecto);
  }
  afiliarInvestigador(): void {
    if (this.selectedInvestigador && this.selectedProyecto) {
      console.log(`Se afilió al investigador ${this.selectedInvestigador} al proyecto ${this.selectedProyecto}`);
    }
  }

}
