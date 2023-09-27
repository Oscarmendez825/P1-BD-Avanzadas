import { Component } from '@angular/core';
import { TopInvestigador } from 'src/app/Interfaces/TopInvestigador';

@Component({
  selector: 'app-top-investigadores',
  templateUrl: './top-investigadores.component.html',
  styleUrls: ['./top-investigadores.component.css']
})
export class TopInvestigadoresComponent {
  top: TopInvestigador[] = [
    {
      "nombre": "Investigador 1",
      "cantidadProyectos": 15
    },
    {
      "nombre": "Investigador 2",
      "cantidadProyectos": 12
    },
    {
      "nombre": "Investigador 3",
      "cantidadProyectos": 10
    },
    {
      "nombre": "Investigador 4",
      "cantidadProyectos": 8
    },
    {
      "nombre": "Investigador 5",
      "cantidadProyectos": 5
    }
  ];
  
}
