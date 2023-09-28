import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './Pages/start-page/start-page.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MantInvestigadoresComponent } from './Pages/mant-investigadores/mant-investigadores.component';
import { FormsModule } from '@angular/forms';
import { MantProyectosComponent } from './Pages/mant-proyectos/mant-proyectos.component';
import { MantPublicacionesComponent } from './Pages/mant-publicaciones/mant-publicaciones.component';
import { TopAreasComponent } from './Pages/top-areas/top-areas.component';
import { TopInstitucionesComponent } from './Pages/top-instituciones/top-instituciones.component';
import { TopInvestigadoresComponent } from './Pages/top-investigadores/top-investigadores.component';
import { BusquedaInvestigadorComponent } from './Pages/busqueda-investigador/busqueda-investigador.component';
import { BusquedaProyectoComponent } from './Pages/busqueda-proyecto/busqueda-proyecto.component';
import { BusquedaPublicacionComponent } from './Pages/busqueda-publicacion/busqueda-publicacion.component';
import { BusquedaAreasComponent } from './Pages/busqueda-areas/busqueda-areas.component';
import { BusquedaColegasComponent } from './Pages/busqueda-colegas/busqueda-colegas.component';
import { AsociarInvestigadorComponent } from './Pages/asociar-investigador/asociar-investigador.component';
import { AsociarArticuloComponent } from './Pages/asociar-articulo/asociar-articulo.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    StartPageComponent,
    LayoutComponent,
    MantInvestigadoresComponent,
    MantProyectosComponent,
    MantPublicacionesComponent,
    TopAreasComponent,
    TopInstitucionesComponent,
    TopInvestigadoresComponent,
    BusquedaInvestigadorComponent,
    BusquedaProyectoComponent,
    BusquedaPublicacionComponent,
    BusquedaAreasComponent,
    BusquedaColegasComponent,
    AsociarInvestigadorComponent,
    AsociarArticuloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
