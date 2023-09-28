import { Component } from '@angular/core';
import { TopInvestigador } from 'src/app/Interfaces/TopInvestigador';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-top-investigadores',
  templateUrl: './top-investigadores.component.html',
  styleUrls: ['./top-investigadores.component.css']
})
export class TopInvestigadoresComponent {
  top: TopInvestigador[] = [];
  
  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getTopInvestigadores();
  }

  getTopInvestigadores(){
    this.apiService.GetTopInvestigadores().subscribe(
      (res) => {
        this.top = res;
      }
    );
  }
  
}
