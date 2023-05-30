import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { ChatComponent } from 'src/app/componentes/chat/chat.component';
import { HomeComponent } from 'src/app/componentes/home/home.component';
import { JuegoPropioComponent } from 'src/app/componentes/juego-propio/juego-propio.component';
import { MayorMenorComponent } from 'src/app/componentes/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from 'src/app/componentes/preguntados/preguntados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AhorcadoComponent } from 'src/app/componentes/ahorcado/ahorcado.component';

@NgModule({
  declarations: [
    ChatComponent,
    HomeComponent,
    JuegoPropioComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JuegosModule { }
