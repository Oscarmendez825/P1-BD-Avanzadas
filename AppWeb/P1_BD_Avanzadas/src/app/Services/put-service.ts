import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Investigador } from "../Interfaces/Investigador";
import { Publicacion } from "../Interfaces/Publicacion";
import { Project } from "../Interfaces/Project";


@Injectable({
    providedIn: 'root'
})
export class PutService {

    private baseUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) {
    }

    //PUT modificar investigador
    //Se le envia al api un objeto del tipo investigador
    //URL: ejemplo: www.ejemplo.com/modificarinvestigador
    ModificarInvestigador(investigador:Investigador):Observable<any>{
        console.log(investigador)
        return this.http.put<any>(this.baseUrl+"investigador/"+investigador.id, investigador);
    }

    //PUT modificar publicacion
    //Se le envia al api un objeto del tipo publicacion
    //URL: ejemplo: www.ejemplo.com/modificarpublicacion
    ModificarPublicacion(publicacion:Publicacion):Observable<any>{
        return this.http.put<any>(this.baseUrl+"publicacion/"+publicacion.idPub, publicacion);
    }

    //PUT modificar proyecto
    //Se le envia al api un objeto del tipo proyecto
    //URL: ejemplo: www.ejemplo.com/modificarproyecto
    ModificarProyectos(proyecto:Project):Observable<any>{
        console.log(proyecto)
        return this.http.put<any>(this.baseUrl+"proyecto/"+proyecto.idPry, proyecto);
    }

}
