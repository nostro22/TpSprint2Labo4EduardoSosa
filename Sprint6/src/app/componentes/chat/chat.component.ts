import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/servicios/firestore.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  private mensajesSubject = new Subject<any>();
  mensajes$ = this.mensajesSubject.asObservable();
  public mensajes: any;
  public sanitizedPhotoUris: any;
  public fechaString?: string;
  public usuarioActual?: string;
  inputControl: FormControl;
  private destroy$ = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private auth: FirestoreService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    this.inputControl = new FormControl('');
  }

  esEscritor(mensaje:any){
    if(!this.auth.usuarioAutenticado)
    {
      this.auth.usuarioEstaAutenticado();
    }
    if(this.auth.usuarioAutenticado?.email==mensaje.escritoPor){
      return true;
    }
    else{
      return false;
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async ngOnInit() {
    const mensajeRefs: any[] = await this.auth.getMensajesRefs();
    const mensajes = await Promise.all(mensajeRefs.map(async (mensajeRef) => ({
      ...mensajeRef,
      escritoPor: mensajeRef.escritoPor,
      mensaje: mensajeRef.mensaje,
      fecha: mensajeRef.fecha,
    })));
  
    this.mensajes = mensajes.sort((a: any, b: any) => {
      const dateA = a.fecha;
      const dateB = b.fecha;
      if (dateA > dateB) {
        return 1;
      } else if (dateA < dateB) {
        return -1;
      } else {
        return 0;
      }
    });
  
    this.mensajesSubject.next(mensajes);
  
    this.mensajes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((mensajes) => {
        this.mensajes = mensajes;
      });
  }
  

  crearMensaje() {
    let mensaje = this.inputControl.value;
    if (mensaje != null && mensaje.trim() != '') {
      this.auth.uploadMensaje(mensaje);
    } else {
    }
    this.inputControl.setValue("");
    this.ngOnInit();
  }


  reload() {
    this.ngOnInit();
  }


  irSeleccion(){
 this.router.navigateByUrl("home");
  }
}
