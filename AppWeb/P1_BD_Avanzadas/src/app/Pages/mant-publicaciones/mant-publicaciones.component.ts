import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Interfaces/Publicacion';

@Component({
  selector: 'app-mant-publicaciones',
  templateUrl: './mant-publicaciones.component.html',
  styleUrls: ['./mant-publicaciones.component.css']
})
export class MantPublicacionesComponent {
  publications: Publicacion[] = [
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

  publication: Publicacion = {
    titulo: '',
    anio: 0,
    revista: ''
  };

  projectSelected: string = "";
  section: boolean = false;

  modifyPublication() {

  }

  createPublication() {

  }

  toggleSection() {
    if (this.section == false) {
      this.section = true;
    } else {
      this.section = false;
    }
    this.publication = {
      titulo: '',
      anio: 0,
      revista: ''
    };
  }

  selectPublication() {
    this.publications.forEach(element => {
      if (element.titulo === this.projectSelected) {
        this.publication = element
      }
    });

  }
}
