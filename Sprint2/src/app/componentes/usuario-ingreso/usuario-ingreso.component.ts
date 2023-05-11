import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-ingreso',
  templateUrl: './usuario-ingreso.component.html',
  styleUrls: ['./usuario-ingreso.component.css']
})
export class UsuarioIngresoComponent implements OnInit{
  public constructor(private fb: FormBuilder, private firebase: FirestoreService, private router: Router, private toastr:ToastrService ) { }
  public loading ?:boolean;
  get email() {
    return this.formularioRegistroUsuario.get('email') as FormControl;
  }
  get clave() {
    return this.formularioRegistroUsuario.get('clave') as FormControl;
  }


  public formularioRegistroUsuario = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'clave': ['', [Validators.required,Validators.minLength(6)]],
  });

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null;
  }

 
  accesoRapido(){
    this.email.setValue("Eduardo@gmail.com");
    this.clave.setValue("123456");
  }

  async logUsuario() {
    try {
      this.loading = true; // set loading to true to show spinner
      await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for 3 seconds
      const user = await this.firebase.signIn(this.email.value, this.clave.value);
      if (user) {
        this.router.navigate(["quien"]); // navigate to the desired route
      } else {
        this.toastNotification('No se pudo autenticar al usuario.');
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.toastNotification('El usuario no se encuentra registrado.');
          break;
        case 'auth/wrong-password':
          this.toastNotification('Combinacion de Clave y correo electronico erronea.');
          break;
        default:
          this.toastNotification('Llene ambos campos correo electronico y clave');
          break;
      }
    } finally {
      this.loading = false; // set loading to false to hide spinner
    }
  }
  
  
  async showLoading() {
    
   this.loading=true;
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  }
  async signup() {
    this.toastNotification("Llene ambos campos correo electronico y clave");
  }
  async toastNotification(mensaje: string) {
    const toast = await this.toastr.warning("Notificación", mensaje,{
      timeOut: 3000,
    });
  }
  
  ngOnInit(): void {
    this.loading=false;
  }
}
