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

    //GET de todas las publicaciones
    //El API debe devolver un array lleno de Publicaciones
    //URL: ejemplo: www.ejemplo.com/publicaciones
    GetPublicaciones():Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl)
    }

    //GET de todos los proyectos
    //El API debe devolver un array lleno de Proyectos
    //URL: ejemplo: www.ejemplo.com/proyectos
    GetProyectos():Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl)
    }

    //GET de todos los investigadores
    //El API debe devolver un array lleno de Investigadores
    //URL: ejemplo: www.ejemplo.com/investigadores
    GetInvestigadores():Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl)
    }

    //GET del top las areas
    //El API debe devolver un array con el top areas
    //URL: ejemplo: www.ejemplo.com/topareas
    GetTopAreas():Observable<Area[]>{
        return this.http.get<Area[]>(this.baseUrl)
    }

    //GET del top de instituciones
    //El API debe devolver un array el top de instituciones
    //URL: ejemplo: www.ejemplo.com/topinstituciones
    GetTopInstituciones():Observable<Instituciones[]>{
        return this.http.get<Instituciones[]>(this.baseUrl)
    }

    //GET del top de investigadores
    //El API debe devolver un array el top investigadores
    //URL: ejemplo: www.ejemplo.com/topinvestigadores
    GetTopInvestigadores():Observable<TopInvestigador[]>{
        return this.http.get<TopInvestigador[]>(this.baseUrl)
    }

    //GET de las publicaciones de un proyecto
    //El API debe devolver un array lleno de publicaciones
    //URL: ejemplo: www.ejemplo.com/proyectopublicaciones/{id del proyecto}
    GetProyectoPublicaciones(proyecto:string):Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl+proyecto)
    }

    //GET de los investigadores en un proyrcto
    //El API debe devolver un array lleno de investigadores
    //URL: ejemplo: www.ejemplo.com/proyectoinvestigadores/{nombre del proyecto}
    GetInvestigadorProyectos(proyecto:string):Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl+proyecto)
    }

    //GET de los proyectos de un investigador
    //El API debe devolver un array lleno de proyectos
    //URL: ejemplo: www.ejemplo.com/investigadorproyectos/{nombre del investigador}
    GetProyectosInvestigador(investigador:string):Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl+investigador)
    }

    //GET de los colegas de un investigador
    //El API debe devolver un array lleno de investigadores
    //URL: ejemplo: www.ejemplo.com/investigadorcolegas/{nombre del investigador}
    GetInvestigadorColegas(investigador:string):Observable<Investigador[]>{
        return this.http.get<Investigador[]>(this.baseUrl+investigador)
    }

    //GET de los proyectos de un area
    //El API debe devolver un array lleno de proyectos
    //URL: ejemplo: www.ejemplo.com/proyectosarea/{nombre del area}
    GetAreaProyectos(area:string):Observable<Project[]>{
        return this.http.get<Project[]>(this.baseUrl+area)
    }

    //GET de los publicaciones de un area
    //El API debe devolver un array lleno de publicaciones
    //URL: ejemplo: www.ejemplo.com/publicacionesarea/{nombre del area}
    GetAreaPublicaciones(area:string):Observable<Publicacion[]>{
        return this.http.get<Publicacion[]>(this.baseUrl+area)
    }

    //GET de todas las areas
    //El API debe devolver un array lleno de areas
    //URL: ejemplo: www.ejemplo.com/areas
    GetAreas():Observable<Area[]>{
        return this.http.get<Area[]>(this.baseUrl)
    }

    //GET de una publicacion y su proyecto
    //El API debe devolver un JSON con un objeto Publicacion y el nombre del proyecto (ver interface publicacion)
    //URL: ejemplo: www.ejemplo.com/publicacionesbusqueda/{nombre de la publicacion}
    GetPublicacionBusqueda(publicacion:string):Observable<Publicacion>{
        return this.http.get<Publicacion>(this.baseUrl+publicacion)
    }
}