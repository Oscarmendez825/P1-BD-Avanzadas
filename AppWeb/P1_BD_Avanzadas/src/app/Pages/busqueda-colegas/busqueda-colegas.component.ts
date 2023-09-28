import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-busqueda-colegas',
  templateUrl: './busqueda-colegas.component.html',
  styleUrls: ['./busqueda-colegas.component.css']
})
export class BusquedaColegasComponent {
  investigadores: Investigador[] = [];

  investigadorSeleccionado: Investigador | null = null;
  investigadoresColegas: Investigador[] = [];

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

  getInvestigadorColegas(name:string){
    this.apiService.GetInvestigadorColegas(name).subscribe(
      (res) => {
        this.investigadoresColegas = res;
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
        this.getInvestigadorColegas(investigadorSeleccionado.nombre_completo);
      }
    }
  }
}
