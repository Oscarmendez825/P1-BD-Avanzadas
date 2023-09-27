import { Component } from '@angular/core';
import { Project } from 'src/app/Interfaces/Project';
import { Publicacion } from 'src/app/Interfaces/Publicacion';

@Component({
  selector: 'app-asociar-articulo',
  templateUrl: './asociar-articulo.component.html',
  styleUrls: ['./asociar-articulo.component.css']
})
export class AsociarArticuloComponent {

  articulos: Publicacion[] = [
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
    {
      "titulo": "Proyecto de Ciencia de Datos",
      "anio": 2022,
      "revista": "Data Science Journal"
    },
    {
      "titulo": "Investigación en Medicina Genómica",
      "anio": 2023,
      "revista": "Genome Research"
    }
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
  selectedArticulo: string | undefined;
  selectedProyecto: string | undefined;
  isButtonDisabled: boolean = true; // Inicialmente, el botón estará deshabilitado


  checkFormValidity(): void {
    this.isButtonDisabled = !(this.selectedArticulo && this.selectedProyecto);
  }
  afiliarInvestigador(): void {
    if (this.selectedArticulo && this.selectedProyecto) {
      console.log(`Se afilió al investigador ${this.selectedArticulo} al proyecto ${this.selectedProyecto}`);
    }
  }
}
