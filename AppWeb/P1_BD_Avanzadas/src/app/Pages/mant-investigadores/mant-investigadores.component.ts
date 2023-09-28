import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';
import { PutService } from 'src/app/Services/put-service';


@Component({
  selector: 'app-mant-investigadores',
  templateUrl: './mant-investigadores.component.html',
  styleUrls: ['./mant-investigadores.component.css']
})
export class MantInvestigadoresComponent {
  
  investigadores: Investigador[] = [];
  investigador: Investigador = {
    id: 0,
    nombre_completo: '',
    titulo_academico: '',
    institucion: '',
    email: ''
  };
  investigatorSelected: number = 0;
  section: boolean = false;

  constructor(private apiService: GetService, private postService: PostService, private putService: PutService) { }

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

  modifyInvestigator() {
    this.putService.ModificarInvestigador(this.investigador).subscribe(
      (res) => {
        location.reload();
      }
    );
  }

  createInvestigator() {
    this.postService.crearInvestigador(this.investigador).subscribe(
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
      this.investigador = {
        id:0,
        nombre_completo: '',
        titulo_academico: '',
        institucion: '',
        email: ''
      };
  }

  selectInvestigator(){
    this.investigadores.forEach(element => {
      if(element.id == this.investigatorSelected){
        this.investigador = element
      }
    });
  }
}
