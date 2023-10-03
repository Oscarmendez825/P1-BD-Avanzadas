import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-busqueda-investigador',
  templateUrl: './busqueda-investigador.component.html',
  styleUrls: ['./busqueda-investigador.component.css']
})
export class BusquedaInvestigadorComponent {

  investigadores: Investigador[] = [];

  investigadorSeleccionado: Investigador | null = null;
  investigacionesInvestigador: Project[] = [];

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getInvestigadores();
  }

  getInvestigadores(){
    this.apiService.GetInvestigadores().subscribe(
      (res) => {
        this.investigadores = res;
      }
    );
  }

  getProyectosInvestigador(id:number|undefined){
    this.apiService.GetProyectosInvestigador(id).subscribe(
      (res) => {
        this.investigacionesInvestigador = res;
      }
    );
  }

  seleccionarInvestigador(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const investigadorSeleccionado = this.investigadores.find(investigador => investigador.nombre_completo === selectedValue);
  
      if (investigadorSeleccionado) {
        this.investigadorSeleccionado = investigadorSeleccionado;
        this.getProyectosInvestigador(investigadorSeleccionado.id);
        
      }
    }
  }
}
