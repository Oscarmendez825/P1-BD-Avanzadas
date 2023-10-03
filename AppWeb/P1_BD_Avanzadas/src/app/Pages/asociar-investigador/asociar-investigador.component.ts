import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-asociar-investigador',
  templateUrl: './asociar-investigador.component.html',
  styleUrls: ['./asociar-investigador.component.css']
})
export class AsociarInvestigadorComponent {
  investigadores: Investigador[] = [];
  proyectos: Project[] = [];
  selectedInvestigador: number | undefined;
  selectedProyecto: string | undefined;
  isButtonDisabled: boolean = true; 
  cont: number = 0;
  afiliar = {
    'id': 0,
    'titulo_proyecto': ''
  }

  constructor(private apiService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getInvestigadores();
    //
  }

  getInvestigadores(){
    this.apiService.GetInvestigadores().subscribe(
      (res) => {
        this.investigadores = res;
      }
    );
  }

  getProyectos(){
    this.apiService.GetProyectos().subscribe(
      (res) => {
        this.proyectos = res;
      }
    );
  }


  checkFormValidity(): void {
    if(this.cont==0){
      this.getProyectos();
      this.cont = 1;
    }
    this.isButtonDisabled = !(this.selectedInvestigador && this.selectedProyecto);
  }
  afiliarInvestigador(): void {
    if (this.selectedInvestigador && this.selectedProyecto) {
      this.afiliar.id =  Number(this.selectedInvestigador)
      this.afiliar.titulo_proyecto = this.selectedProyecto
      this.postService.AfiliarInvestigador(this.afiliar).subscribe(
        (res) => {
          location.reload();
        }
      );
    }
  }

}
