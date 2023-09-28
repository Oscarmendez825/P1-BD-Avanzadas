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

  publicacionesSeleccionadas: string[] = [];
  detallesPublicaciones: Publicacion[] = [];
  detallesPublicacion: Publicacion | undefined;

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

  mostrarDetalles(event: any) {
    const tituloSeleccionado: string = event.target.value;
    this.detallesPublicacion = this.publicaciones.find(pub => pub.titulo_publicacion === tituloSeleccionado);
  }
}
