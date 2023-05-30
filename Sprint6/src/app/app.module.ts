import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './componentes/error/error.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FormBuilder, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioRegistroComponent } from './componentes/usuario-registro/usuario-registro.component';
import { UsuarioIngresoComponent } from './componentes/usuario-ingreso/usuario-ingreso.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ListadoEncuestaComponent } from './componentes/listado-encuesta/listado-encuesta.component';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    UsuarioRegistroComponent,
    UsuarioIngresoComponent,
    QuienSoyComponent,
    EncuestaComponent,
    ListadoEncuestaComponent,
    ListadoResultadosComponent
    
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
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
