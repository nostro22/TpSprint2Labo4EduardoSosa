import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TablaPeliculaComponent } from './componentes/tabla-pelicula/tabla-pelicula.component';
import { ActorListadoComponent } from './componentes/actor-listado/actor-listado.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PeliculaAltaComponent } from './componentes/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './componentes/pelicula-listado/pelicula-listado.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { DetallePeliculaComponent } from './componentes/detalle-pelicula/detalle-pelicula.component';
import { BajaPeliculaComponent } from './componentes/baja-pelicula/baja-pelicula.component';
import { EdicionPeliculaComponent } from './componentes/edicion-pelicula/edicion-pelicula.component';

import { FormBuilder, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AltaActoresComponent } from './page/alta-actores/alta-actores.component';
import { TablaPaisesComponent } from './componentes/tabla-paises/tabla-paises.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioRegistroComponent } from './componentes/usuario-registro/usuario-registro.component';
import { UsuarioIngresoComponent } from './componentes/usuario-ingreso/usuario-ingreso.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';


@NgModule({
  declarations: [
    AppComponent,
    TablaPeliculaComponent,
    ActorListadoComponent,
    BusquedaComponent,
    ErrorComponent,
    PeliculaAltaComponent,
    PeliculaListadoComponent,
    HeaderComponent,
    BienvenidoComponent,
    DetallePeliculaComponent,
    BajaPeliculaComponent,
    EdicionPeliculaComponent,
    AltaActoresComponent,
    TablaPaisesComponent,
    UsuarioRegistroComponent,
    UsuarioIngresoComponent,
    QuienSoyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
