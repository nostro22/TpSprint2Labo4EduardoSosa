import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { UsuarioRegistroComponent } from './componentes/usuario-registro/usuario-registro.component';
import { UsuarioIngresoComponent } from './componentes/usuario-ingreso/usuario-ingreso.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginGuard } from 'src/login.guard';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { IsAdminGuard } from 'src/is-admin.guard';
import { ListadoEncuestaComponent } from './componentes/listado-encuesta/listado-encuesta.component';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';


const routes: Routes = [
  {path:"home", redirectTo:""},
  {path:"", title:"Home", loadChildren:()=> import('../juegos/juegos.module').then(m=>m.JuegosModule) , canActivate:[LoginGuard]},
  {path:"quien", title:"Quien soy", component: QuienSoyComponent},
  {path:"usuario/ingreso", title:"Ingreso", component: UsuarioIngresoComponent},
  {path:"usuario/registro", title:"Registro", component: UsuarioRegistroComponent},
  {path:"encuesta", title:"Encuesta", component: EncuestaComponent , canActivate:[LoginGuard]},
  {path:"resultados", title:"Resultados", component: ListadoResultadosComponent , canActivate:[LoginGuard]},
  {path:"encuesta/listado", title:"Listado Encuestas", component: ListadoEncuestaComponent , canActivate:[IsAdminGuard]},
  {path:"error", title:"ERROR", component: ErrorComponent},
  {path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

