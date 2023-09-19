import { Component } from '@angular/core';
import { Project } from 'src/app/Interfaces/Project';

@Component({
  selector: 'app-mant-proyectos',
  templateUrl: './mant-proyectos.component.html',
  styleUrls: ['./mant-proyectos.component.css']
})
export class MantProyectosComponent {
  projects: Project[] = [
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
    {
      "titulo": "Proyecto de Ciencia de Datos",
      "anio": 2022,
      "duracion": 3,
      "area": "Data Science Journal"
    },
    {
      "titulo": "Investigación en Medicina Genómica",
      "anio": 2023,
      "duracion": 2,
      "area": "Genome Research"
    }
  ];
  
  project: Project = {
    titulo: '',
    anio: 0,
    duracion: 0,
    area: ''
  };

  projectSelected: string = "";
  section: boolean = false;



  modifyProject() {
    
  }

  createProject() {
    
  }

  toggleSection(){
      if (this.section == false){
        this.section = true;
      }else{
        this.section = false;
      }
      this.project = {
        titulo: '',
        anio: 0,
        duracion: 0,
        area: ''
      };
  }

  selectProject(){
    this.projects.forEach(element => {
      if(element.titulo === this.projectSelected){
        this.project = element
      }
    });
    
  }
}
