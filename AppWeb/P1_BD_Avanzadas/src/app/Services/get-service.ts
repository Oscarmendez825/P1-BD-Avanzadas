import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publicacion } from "../Interfaces/Publicacion";
import { Project } from "../Interfaces/Project";
import { Investigador } from "../Interfaces/Investigador";
import { Area } from "../Interfaces/Area";
import { Instituciones } from "../Interfaces/Instituciones";
import { TopInvestigador } from "../Interfaces/TopInvestigador";

@Injectable({
    providedIn: 'root'
})
export class GetService {

    private baseUrl = '';

    constructor(private http: HttpClient) {

    }

    GetPublicaciones():Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl)
    }

    GetProyectos():Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl)
    }

    GetInvestigadores():Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl)
    }

    GetTopAreas():Observable<Area[]>{
        return this.http.get<Area[]>(this.baseUrl)
    }

    GetTopInstituciones():Observable<Instituciones[]>{
        return this.http.get<Instituciones[]>(this.baseUrl)
    }

    GetTopInvestigadores():Observable<TopInvestigador[]>{
        return this.http.get<TopInvestigador[]>(this.baseUrl)
    }

    GetProyectoPublicaciones(proyecto:string):Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl+proyecto)
    }

    GetProyectoInvestigadores(proyecto:string):Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl+proyecto)
    }

    GetInvestigadorProyectos(investigador:string):Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl+investigador)
    }

    GetProyectosInvestigador(investigador:string):Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl+investigador)
    }

    GetInvestigadorColegas(investigador:string):Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl+investigador)
    }

    GetAreaProyectos(area:string):Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl+area)
    }

    GetAreaPublicaciones(area:string):Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl+area)
    }

    GetAreas():Observable<Area[]>{
        return this.http.get<Area[]>(this.baseUrl)
    }


}