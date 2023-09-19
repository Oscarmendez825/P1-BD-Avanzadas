import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './Pages/start-page/start-page.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { MantInvestigadoresComponent } from './Pages/mant-investigadores/mant-investigadores.component';
import { MantProyectosComponent } from './Pages/mant-proyectos/mant-proyectos.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Estructura de página principal con header y footer
    children: [
      { path: 'home', component: StartPageComponent },
      { path: 'mantInv', component: MantInvestigadoresComponent},
      { path: 'mantProj', component: MantProyectosComponent},
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
