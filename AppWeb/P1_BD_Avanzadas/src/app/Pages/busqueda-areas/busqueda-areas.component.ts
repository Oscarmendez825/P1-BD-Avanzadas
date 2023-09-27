import { Component } from '@angular/core';
import { Area } from 'src/app/Interfaces/Area';
import { Project } from 'src/app/Interfaces/Project';
import { Publicacion } from 'src/app/Interfaces/Publicacion';

@Component({
  selector: 'app-busqueda-areas',
  templateUrl: './busqueda-areas.component.html',
  styleUrls: ['./busqueda-areas.component.css']
})
export class BusquedaAreasComponent {
  investigaciones: Project[] = [];
  publicaciones: Publicacion[] = [];
  areas: Area[] = [
    {
      "nombre": "Área 1",
      "cantidad": 0
    },
    {
      "nombre": "Área 2",
      "cantidad": 0
    },
    {
      "nombre": "Área 3",
      "cantidad": 0
    }
  ];
  areaSeleccionada: Area | null = null;

  seleccionarArea(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const areaSeleccionada = this.areas.find(area => area.nombre === selectedValue);
  
      if (areaSeleccionada) {
        this.areaSeleccionada = areaSeleccionada;
        this.investigaciones = [
          {
            "titulo": "Investigación sobre Cambio Climático",
            "anio": 2022,
            "duracion": 3,
            "area": "Nature"
          },
          {
            "titulo": "Estudio de Energía Renovable",
            "anio": 2023,
            "duracion": 2,
            "area": "Science"
          },
          {
            "titulo": "Desarrollo de Inteligencia Artificial",
            "anio": 2024,
            "duracion": 4,
            "area": "Journal of Artificial Intelligence Research"
          },
          // Agrega más investigadores según sea necesario
        ];

        this.publicaciones = [
          {
            "titulo": "Investigación sobre Cambio Climático",
            "anio": 2022,
            "revista": "Nature"
          },
          {
            "titulo": "Estudio de Energía Renovable",
            "anio": 2023,
            "revista": "Science"
          },
          {
            "titulo": "Desarrollo de Inteligencia Artificial",
            "anio": 2024,
            "revista": "Journal of Artificial Intelligence Research"
          },
        ];
        
      }
    }
  }
}
