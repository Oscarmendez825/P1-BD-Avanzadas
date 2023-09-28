import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './Pages/start-page/start-page.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { MantInvestigadoresComponent } from './Pages/mant-investigadores/mant-investigadores.component';
import { MantProyectosComponent } from './Pages/mant-proyectos/mant-proyectos.component';
import { MantPublicacionesComponent } from './Pages/mant-publicaciones/mant-publicaciones.component';
import { AsociarInvestigadorComponent } from './Pages/asociar-investigador/asociar-investigador.component';
import { AsociarArticuloComponent } from './Pages/asociar-articulo/asociar-articulo.component';
import { TopAreasComponent } from './Pages/top-areas/top-areas.component';
import { TopInstitucionesComponent } from './Pages/top-instituciones/top-instituciones.component';
import { BusquedaInvestigadorComponent } from './Pages/busqueda-investigador/busqueda-investigador.component';
import { BusquedaProyectoComponent } from './Pages/busqueda-proyecto/busqueda-proyecto.component';
import { BusquedaPublicacionComponent } from './Pages/busqueda-publicacion/busqueda-publicacion.component';
import { BusquedaAreasComponent } from './Pages/busqueda-areas/busqueda-areas.component';
import { BusquedaColegasComponent } from './Pages/busqueda-colegas/busqueda-colegas.component';
import { TopInvestigadoresComponent } from './Pages/top-investigadores/top-investigadores.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Estructura de página principal con header y footer
    children: [
      { path: 'home', component: StartPageComponent },
      { path: 'mantInvestigadores', component: MantInvestigadoresComponent},
      { path: 'mantProyectos', component: MantProyectosComponent},
      { path: 'mantPublicaciones', component: MantPublicacionesComponent},
      { path: 'asocInvestigador', component: AsociarInvestigadorComponent },
      { path: 'asocArticulo', component: AsociarArticuloComponent},
      { path: 'topAreas', component: TopAreasComponent},
      { path: 'topInstituciones', component: TopInstitucionesComponent},
      { path: 'topInvestigadores', component: TopInvestigadoresComponent },
      { path: 'busqInvestigador', component: BusquedaInvestigadorComponent},
      { path: 'busqProyecto', component: BusquedaProyectoComponent},
      { path: 'busqPublicacion', component: BusquedaPublicacionComponent},
      { path: 'busqArea', component: BusquedaAreasComponent},
      { path: 'busqColega', component: BusquedaColegasComponent},
      {path: "**", redirectTo: "home", pathMatch:"full"}, 
    ],
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
