import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-busqueda-proyecto',
  templateUrl: './busqueda-proyecto.component.html',
  styleUrls: ['./busqueda-proyecto.component.css']
})
export class BusquedaProyectoComponent {
  proyectos: Project[] = [];

  proyectoSeleccionado: Project | null = null;
  investigadoresProyecto: Investigador[] = [];
  publicacionesProyecto: Publicacion[] = [];

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.apiService.GetProyectos().subscribe(
      (res) => {
        this.proyectos = res;
      }
    );
  }

  getInvestigadoresProyecto(name:string){
    this.apiService.GetInvestigadorProyectos(name).subscribe(
      (res) => {
        this.investigadoresProyecto = res;
      }
    );
  }

  getPublicacionesProyecto(name:string){
    this.apiService.GetProyectoPublicaciones(name).subscribe(
      (res) => {
        this.publicacionesProyecto = res;
      }
    );
  }


  seleccionarProyecto(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const proyectoSeleccionado = this.proyectos.find(proyecto => proyecto.titulo_proyecto === selectedValue);
  
      if (proyectoSeleccionado) {
        this.proyectoSeleccionado = proyectoSeleccionado;
        this.getInvestigadoresProyecto(proyectoSeleccionado.titulo_proyecto);
        this.getPublicacionesProyecto(proyectoSeleccionado.titulo_proyecto);
      }
    }
  }
}
