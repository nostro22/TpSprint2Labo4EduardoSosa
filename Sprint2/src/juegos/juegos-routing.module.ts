import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from 'src/app/componentes/ahorcado/ahorcado.component';
import { ChatComponent } from 'src/app/componentes/chat/chat.component';
import { HomeComponent } from 'src/app/componentes/home/home.component';
import { JuegoPropioComponent } from 'src/app/componentes/juego-propio/juego-propio.component';
import { MayorMenorComponent } from 'src/app/componentes/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from 'src/app/componentes/preguntados/preguntados.component';

const routes: Routes = [
  {path:"", title:"Home", component: HomeComponent},
  {path:"juegos/ahorcado", title:"ahorcado", component: AhorcadoComponent},
  {path:"juegos/mayorMenor", title:"Mayor Menor", component: MayorMenorComponent},
  {path:"juegos/preguntados", title:"Preguntados", component: PreguntadosComponent},
  {path:"chat", title:"chat", component: ChatComponent},
  {path:"juegos/miJuego", title:"Mi Juego", component: JuegoPropioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
