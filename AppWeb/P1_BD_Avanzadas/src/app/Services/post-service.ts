import { HttpClient } from "@angular/common/http";
import { Publicacion } from "../Interfaces/Publicacion";
import { Observable } from "rxjs";
import { Project } from "../Interfaces/Project";
import { Investigador } from "../Interfaces/Investigador";
import { Injectable, NgModule } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class PostService {

    private baseUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) {
    }

    //POST crear una publicacion
    //Se le envia al api un objeto del tipo publicacion
    //URL: ejemplo: www.ejemplo.com/publicacion
    crearPublicacion(pub:Publicacion):Observable<any>{
        return this.http.post<any>(this.baseUrl+"publicacion", pub);
    }

    //POST crear un proyecto
    //Se le envia al api un objeto del tipo proyecto
    //URL: ejemplo: www.ejemplo.com/proyecto
    crearProyecto(proyecto:Project):Observable<any>{
        return this.http.post<any>(this.baseUrl+"proyecto", proyecto);
    }

    //POST crear un investigador
    //Se le envia al api un objeto del tipo investigador
    //URL: ejemplo: www.ejemplo.com/investigador
    crearInvestigador(investigador:Investigador):Observable<any>{
        return this.http.post<any>(this.baseUrl+"investigador", investigador);
    }

    //POST afiliar a un investigador a un proyecto
    //Se le envia al api un objeto del tipo afiliar afiliar = { 'investigador': 0, 'proyecto': ''}
    //URL: ejemplo: www.ejemplo.com/afiliarinvestigador
    AfiliarInvestigador(afiliar:any):Observable<any>{
        console.log(afiliar)
        return this.http.post<any>(this.baseUrl+"investigador/asociar", afiliar);
    }

    //POST asociar un articulo a un proyecto
    //Se le envia al api un objeto del tipo afiliar afiliar = { 'articulo': '', 'proyecto': ''}
    //URL: ejemplo: www.ejemplo.com/asociar articulo
    AsociarArticulo(asociar:any):Observable<any>{
        console.log(asociar)
        return this.http.post<any>(this.baseUrl+"publicacion/asociar/Inv/Pro", asociar);
    }

    //POST subir archivos csv
    //Se le envia al api un array de objetos de tipo File
    //URL: ejemplo: www.ejemplo.com/subircsv
    SubirArchivos(archivos:File[]):Observable<File>{
        console.log(archivos);
        return this.http.post<any>(this.baseUrl, archivos);
    }
}
