import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';

@Component({
  selector: 'app-mant-publicaciones',
  templateUrl: './mant-publicaciones.component.html',
  styleUrls: ['./mant-publicaciones.component.css']
})
export class MantPublicacionesComponent {
  publications: Publicacion[] = [];

  publication: Publicacion = {
    titulo: '',
    anio: 0,
    revista: ''
  };

  projectSelected: string = "";
  section: boolean = false;

  constructor(private apiService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(){
    this.apiService.GetPublicaciones().subscribe(
      (res) => {
        this.publications = res;
      }
    );
  }

  modifyPublication() {

  }

  createPublication() {
    this.postService.crearPublicacion(this.publication).subscribe(
      (res) => {
        location.reload();
      }
    );
  }

  toggleSection() {
    if (this.section == false) {
      this.section = true;
    } else {
      this.section = false;
    }
    this.publication = {
      titulo: '',
      anio: 0,
      revista: ''
    };
  }

  selectPublication() {
    this.publications.forEach(element => {
      if (element.titulo === this.projectSelected) {
        this.publication = element
      }
    });

  }
}
