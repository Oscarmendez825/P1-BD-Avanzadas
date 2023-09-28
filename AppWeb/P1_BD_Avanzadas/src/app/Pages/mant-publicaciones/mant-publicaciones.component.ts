import { Component } from '@angular/core';
import { Publicacion } from 'src/app/Interfaces/Publicacion';
import { GetService } from 'src/app/Services/get-service';
import { PostService } from 'src/app/Services/post-service';
import { PutService } from 'src/app/Services/put-service';

@Component({
  selector: 'app-mant-publicaciones',
  templateUrl: './mant-publicaciones.component.html',
  styleUrls: ['./mant-publicaciones.component.css']
})
export class MantPublicacionesComponent {
  publications: Publicacion[] = [];

  publication: Publicacion = {
    idPub: 0,
    titulo_publicacion: '',
    anno_publicacion: 0,
    nombre_revista: ''
  };

  projectSelected: string = "";
  section: boolean = false;

  constructor(private apiService: GetService, private postService: PostService, private putService: PutService) { }

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
    this.putService.ModificarPublicacion(this.publication).subscribe(
      (res) => {
        location.reload();
      }
    );
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
      idPub: 0,
      titulo_publicacion: '',
      anno_publicacion: 0,
      nombre_revista: ''
    };
  }

  selectPublication() {
    this.publications.forEach(element => {
      if (element.titulo_publicacion === this.projectSelected) {
        this.publication = element
      }
    });

  }
}
