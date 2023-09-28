import { Component } from '@angular/core';
import { Instituciones } from 'src/app/Interfaces/Instituciones';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-top-instituciones',
  templateUrl: './top-instituciones.component.html',
  styleUrls: ['./top-instituciones.component.css']
})
export class TopInstitucionesComponent {
  instituciones: Instituciones[] = [];

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getTopInstituciones();
  }

  getTopInstituciones(){
    this.apiService.GetTopInstituciones().subscribe(
      (res) => {
        this.instituciones = res;
      }
    );
  }
}
