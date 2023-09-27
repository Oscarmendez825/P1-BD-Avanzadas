import { Component } from '@angular/core';
import { Area } from 'src/app/Interfaces/Area';

@Component({
  selector: 'app-top-areas',
  templateUrl: './top-areas.component.html',
  styleUrls: ['./top-areas.component.css']
})
export class TopAreasComponent {
  areas: Area[] = [
    {
      "nombre": "Área 1",
      "cantidad": 10
    },
    {
      "nombre": "Área 2",
      "cantidad": 8
    },
    {
      "nombre": "Área 3",
      "cantidad": 6
    },
    {
      "nombre": "Área 4",
      "cantidad": 5
    },
    {
      "nombre": "Área 5",
      "cantidad": 4
    }
  ];
  
}
