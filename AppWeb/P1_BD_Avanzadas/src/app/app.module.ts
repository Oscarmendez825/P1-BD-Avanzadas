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
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    StartPageComponent,
    LayoutComponent,
    MantInvestigadoresComponent,
    MantProyectosComponent,
    MantPublicacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
