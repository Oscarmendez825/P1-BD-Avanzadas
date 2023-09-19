import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';


@Component({
  selector: 'app-mant-investigadores',
  templateUrl: './mant-investigadores.component.html',
  styleUrls: ['./mant-investigadores.component.css']
})
export class MantInvestigadoresComponent {
  
  investigadores: Investigador[] = [
    {
      "id": 1,
      "nombreCompleto": "Juan Pérez",
      "tituloAcademico": "Doctor en Ciencias",
      "institucion": "Universidad XYZ",
      "correoElectronico": "juan.perez@example.com"
    },
    {
      "id": 2,
      "nombreCompleto": "María Rodríguez",
      "tituloAcademico": "Licenciada en Biología",
      "institucion": "Instituto ABC",
      "correoElectronico": "maria.rodriguez@example.com"
    },
    {
      "id": 3,
      "nombreCompleto": "Carlos González",
      "tituloAcademico": "Máster en Física",
      "institucion": "Universidad 123",
      "correoElectronico": "carlos.gonzalez@example.com"
    }
  ];
  investigador: Investigador = {
    id: 0,
    nombreCompleto: '',
    tituloAcademico: '',
    institucion: '',
    correoElectronico: ''
  };
  investigatorSelected: number = 0;
  section: boolean = false;



  modifyInvestigator() {
    
  }

  createInvestigator() {
    
  }

  toggleSection(){
      if (this.section == false){
        this.section = true;
      }else{
        this.section = false;
      }
      this.investigador = {
        id: 0,
        nombreCompleto: '',
        tituloAcademico: '',
        institucion: '',
        correoElectronico: ''
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
