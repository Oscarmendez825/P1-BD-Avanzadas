import { Component } from '@angular/core';
import { Project } from 'src/app/Interfaces/Project';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-mant-proyectos',
  templateUrl: './mant-proyectos.component.html',
  styleUrls: ['./mant-proyectos.component.css']
})
export class MantProyectosComponent {
  projects: Project[] = [];
  
  project: Project = {
    titulo: '',
    anio: 0,
    duracion: 0,
    area: ''
  };

  projectSelected: string = "";
  section: boolean = false;
  
  constructor(private apiService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.apiService.GetProyectos().subscribe(
      (res) => {
        this.projects = res;
      }
    );
  }


  modifyProject() {
    
  }

  createProject() {
    this.postService.crearProyecto(this.project).subscribe(
      (res) => {
        location.reload();
      }
    );
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
