import { Component } from '@angular/core';
import { Area } from 'src/app/Interfaces/Area';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-top-areas',
  templateUrl: './top-areas.component.html',
  styleUrls: ['./top-areas.component.css']
})
export class TopAreasComponent {
  areas: Area[] = [];

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getTopAreas();
  }

  getTopAreas(){
    this.apiService.GetTopAreas().subscribe(
      (res) => {
        this.areas = res;
      }
    );
  }
  
}
