import { Component } from '@angular/core';
import { Investigador } from 'src/app/Interfaces/Investigador';
import { Project } from 'src/app/Interfaces/Project';
import { Publicacion } from 'src/app/Interfaces/Publicacion';

@Component({
  selector: 'app-busqueda-proyecto',
  templateUrl: './busqueda-proyecto.component.html',
  styleUrls: ['./busqueda-proyecto.component.css']
})
export class BusquedaProyectoComponent {
  proyectos: Project[] = [
    {
      "titulo": "Investigación sobre Cambio Climático",
      "anio": 2022,
      "duracion": 3,
      "area": "Nature"
    },
    {
      "titulo": "Estudio de Energía Renovable",
      "anio": 2023,
      "duracion": 2,
      "area": "Science"
    },
    {
      "titulo": "Desarrollo de Inteligencia Artificial",
      "anio": 2024,
      "duracion": 4,
      "area": "Journal of Artificial Intelligence Research"
    },
    // Agrega más investigadores según sea necesario
  ];

  proyectoSeleccionado: Project | null = null;
  investigadoresProyecto: Investigador[] = [];
  publicacionesProyecto: Publicacion[] = [];

  seleccionarProyecto(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue) {
      const proyectoSeleccionado = this.proyectos.find(proyecto => proyecto.titulo === selectedValue);
  
      if (proyectoSeleccionado) {
        this.proyectoSeleccionado = proyectoSeleccionado;
        // Simulamos la obtención de las investigaciones del investigador seleccionado.
        this.investigadoresProyecto = [
          {
            "id": 1,
            "nombreCompleto": "Juan Pérez",
            "tituloAcademico": "Doctor en Ciencias",
            "institucion": "Universidad XYZ",
            "correoElectronico": "juan.perez@example.com"
          },
          {
            "id": 2,
            "nombreCompleto": "María Rodríguez",
            "tituloAcademico": "Licenciada en Biología",
            "institucion": "Instituto ABC",
            "correoElectronico": "maria.rodriguez@example.com"
          },
          {
            "id": 3,
            "nombreCompleto": "Carlos González",
            "tituloAcademico": "Máster en Física",
            "institucion": "Universidad 123",
            "correoElectronico": "carlos.gonzalez@example.com"
          }
          // Agrega más investigaciones según sea necesario
        ];

        this.publicacionesProyecto = [
          {
            "titulo": "Investigación sobre Cambio Climático",
            "anio": 2022,
            "revista": "Nature"
          },
          {
            "titulo": "Estudio de Energía Renovable",
            "anio": 2023,
            "revista": "Science"
          },
          {
            "titulo": "Desarrollo de Inteligencia Artificial",
            "anio": 2024,
            "revista": "Journal of Artificial Intelligence Research"
          },
        ];
      }
    }
  }
}
