import { Component } from '@angular/core';
// Ejemplo de importación de FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostService } from 'src/app/Services/post-service';

// Ejemplo de importación de Bootstrap (si es necesario)
//import 'bootstrap/dist/css/bootstrap.min.css';

//import { NgxFileDropComponent } from 'ngx-file-drop/public-api';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {


  selectedFiles: File[] = [];

  constructor(private postService: PostService) { }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  onFileDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  subirArchivos(){
    this.postService.SubirArchivos(this.selectedFiles).subscribe(
      (res) => {
        location.reload();
      }
    );
  }

}
