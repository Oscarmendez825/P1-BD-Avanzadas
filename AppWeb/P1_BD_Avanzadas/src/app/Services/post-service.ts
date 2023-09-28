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

    private baseUrl = '';

    constructor(private http: HttpClient) {
    }

    crearPublicacion(pub:Publicacion):Observable<any>{
        return this.http.post<any>(this.baseUrl, pub);
    }

    crearProyecto(proyecto:Project):Observable<any>{
        return this.http.post<any>(this.baseUrl, proyecto);
    }

    crearInvestigador(investigador:Investigador):Observable<any>{
        return this.http.post<any>(this.baseUrl, investigador);
    }

    AfiliarInvestigador(afiliar:any):Observable<any>{
        return this.http.post<any>(this.baseUrl, afiliar);
    }

    AsociarArticulo(asociar:any):Observable<any>{
        return this.http.post<any>(this.baseUrl, asociar);
    }

    SubirArchivos(archivos:File[]):Observable<File>{
        console.log(archivos);
        return this.http.post<any>(this.baseUrl, archivos);
    }
}
