import { Component } from '@angular/core';
import { Project } from 'src/app/Interfaces/Project';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-asociar-articulo',
  templateUrl: './asociar-articulo.component.html',
  styleUrls: ['./asociar-articulo.component.css']
})
export class AsociarArticuloComponent {

  articulos: Publicacion[] = [];
  proyectos: Project[] = [];
  selectedArticulo: string | undefined;
  selectedProyecto: string | undefined;
  isButtonDisabled: boolean = true; // Inicialmente, el botón estará deshabilitado

  asociar = {
    'articulo': '',
    'proyecto': ''
  }

  constructor(private apiService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getPublicaciones();
    this.getProyectos();
  }

  getPublicaciones(){
    this.apiService.GetPublicaciones().subscribe(
      (res) => {
        this.articulos = res;
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
    this.isButtonDisabled = !(this.selectedArticulo && this.selectedProyecto);
  }
  afiliarInvestigador(): void {
    if (this.selectedArticulo && this.selectedProyecto) {
      this.asociar.articulo = this.selectedArticulo
      this.asociar.proyecto = this.selectedProyecto
      this.postService.AsociarArticulo(this.asociar).subscribe(
        (res) => {
          location.reload();
        }
      );
    }
  }
  
}
