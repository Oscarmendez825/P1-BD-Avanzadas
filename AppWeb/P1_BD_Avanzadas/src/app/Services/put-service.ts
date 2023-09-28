import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Investigador } from "../Interfaces/Investigador";
import { Publicacion } from "../Interfaces/Publicacion";
import { Project } from "../Interfaces/Project";

export class PutService {

    @Injectable({
        providedIn: 'root'
    })

    private baseUrl = '';

    constructor(private http: HttpClient) {
    }

    //PUT modificar investigador
    //Se le envia al api un objeto del tipo investigador
    //URL: ejemplo: www.ejemplo.com/modificarinvestigador
    ModificarInvestigador(investigador:Investigador):Observable<any>{
        return this.http.put<any>(this.baseUrl, investigador);
    }

    //PUT modificar publicacion
    //Se le envia al api un objeto del tipo publicacion
    //URL: ejemplo: www.ejemplo.com/modificarpublicacion
    ModificarPublicacion(publicacion:Publicacion):Observable<any>{
        return this.http.put<any>(this.baseUrl, publicacion);
    }

    //PUT modificar proyecto
    //Se le envia al api un objeto del tipo proyecto
    //URL: ejemplo: www.ejemplo.com/modificarproyecto
    ModificarProyectos(proyecto:Project):Observable<any>{
        return this.http.put<any>(this.baseUrl, proyecto);
    }

}
