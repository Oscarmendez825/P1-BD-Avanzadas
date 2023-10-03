import { Component } from '@angular/core';
import { Area } from 'src/app/Interfaces/Area';
import { Project } from 'src/app/Interfaces/Project';
import { PubBusq } from 'src/app/Interfaces/PubBusq';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-busqueda-areas',
  templateUrl: './busqueda-areas.component.html',
  styleUrls: ['./busqueda-areas.component.css']
})
export class BusquedaAreasComponent {
  informacion: PubBusq[] = [];
  areas: Area[] = [];
  areaSeleccionada: Area | null = null;

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(){
    this.apiService.GetAreas().subscribe(
      (res) => {
        this.areas = res;
      }
    );
  }

  getAreaInfo(name:string){
    this.apiService.GetAreaInfo(name).subscribe(
      (res) => {
        this.informacion = res;
      }
    );
  }


  seleccionarArea(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const areaSeleccionada = this.areas.find(area => area.nombre === selectedValue);
  
      if (areaSeleccionada) {
        this.areaSeleccionada = areaSeleccionada;
        this.getAreaInfo(areaSeleccionada.nombre);
      }
    }
  }
}
