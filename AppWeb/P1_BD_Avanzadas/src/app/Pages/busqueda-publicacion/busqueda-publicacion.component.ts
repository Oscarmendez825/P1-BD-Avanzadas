import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Interfaces/Publicacion';

@Component({
  selector: 'app-busqueda-publicacion',
  templateUrl: './busqueda-publicacion.component.html',
  styleUrls: ['./busqueda-publicacion.component.css']
})
export class BusquedaPublicacionComponent {
  publicaciones: Publicacion[] = [
    {
      "titulo": "Artículo 1",
      "anio": 2023,
      "revista": "Revista A",
      "proyecto": "Proyecto X"
    },
    {
      "titulo": "Artículo 2",
      "anio": 2022,
      "revista": "Revista B"
    },
    {
      "titulo": "Artículo 3",
      "anio": 2023,
      "revista": "Revista A",
      "proyecto": "Proyecto Y"
    },
    {
      "titulo": "Artículo 4",
      "anio": 2021,
      "revista": "Revista C"
    },
    {
      "titulo": "Artículo 5",
      "anio": 2022,
      "revista": "Revista B",
      "proyecto": "Proyecto Z"
    }
  ];

  publicacionesSeleccionadas: string[] = [];
  detallesPublicaciones: Publicacion[] = [];
  detallesPublicacion: Publicacion | undefined;

  mostrarDetalles(event: any) {
    const tituloSeleccionado: string = event.target.value;
    this.detallesPublicacion = this.publicaciones.find(pub => pub.titulo === tituloSeleccionado);
  }
}
