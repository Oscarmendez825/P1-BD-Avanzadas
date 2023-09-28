import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';

@Component({
  selector: 'app-busqueda-publicacion',
  templateUrl: './busqueda-publicacion.component.html',
  styleUrls: ['./busqueda-publicacion.component.css']
})
export class BusquedaPublicacionComponent {
  publicaciones: Publicacion[] = [];
  selectedPubs: Publicacion[] = [];
  publicacionesSeleccionadas: string[] = [];

  constructor(private apiService: GetService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(){
    this.apiService.GetPublicaciones().subscribe(
      (res) => {
        this.publicaciones = res;
      }
    );
  }

  getPublicacionBusqueda(tituloSeleccionado:string){
    this.apiService.GetPublicacionBusqueda(tituloSeleccionado).subscribe(
      (res) => {
        this.selectedPubs.push(res);
      }
    );
  }

  mostrarDetalles(event: any) {
    const tituloSeleccionado: string = event.target.value;
    this.publicaciones = this.publicaciones.filter((publicacion: any) => publicacion.titulo_publicacion !== tituloSeleccionado);
    this.getPublicacionBusqueda(tituloSeleccionado);
    
  }
}
