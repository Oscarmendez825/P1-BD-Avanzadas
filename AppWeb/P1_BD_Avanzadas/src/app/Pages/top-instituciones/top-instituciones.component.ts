import { Component } from '@angular/core';
import { Instituciones } from 'src/app/Interfaces/Instituciones';

@Component({
  selector: 'app-top-instituciones',
  templateUrl: './top-instituciones.component.html',
  styleUrls: ['./top-instituciones.component.css']
})
export class TopInstitucionesComponent {
  instituciones: Instituciones[] = [
    {
      "nombre": "Institucion 1",
      "cantidad": 10
    },
    {
      "nombre": "Institucion 2",
      "cantidad": 8
    },
    {
      "nombre": "Institucion 3",
      "cantidad": 6
    },
    {
      "nombre": "Institucion 4",
      "cantidad": 5
    },
    {
      "nombre": "Institucion 5",
      "cantidad": 4
    }
  ];
}
