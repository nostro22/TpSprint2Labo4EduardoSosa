import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css'],
})
export class UsuarioRegistroComponent {

  public constructor(private fb: FormBuilder, private firebase: FirestoreService , private toastr:ToastrService, private router:Router) { }
  get nombre() {
    return this.formularioRegistroUsuario.get('nombre') as FormControl;
  }
  get apellido() {
    return this.formularioRegistroUsuario.get('apellido') as FormControl;
  }
  get edad() {
    return this.formularioRegistroUsuario.get('edad') as FormControl;
  }
  get sexo() {
    return this.formularioRegistroUsuario.get('sexo') as FormControl;
  }
  get email() {
    return this.formularioRegistroUsuario.get('email') as FormControl;
  }
  get terminos() {
    return this.formularioRegistroUsuario.get('terminos') as FormControl;
  }
  get clave() {
    return this.formularioRegistroUsuario.get('clave') as FormControl;
  }


  public formularioRegistroUsuario = this.fb.group({
    'nombre': ['', [Validators.required, this.spacesValidator]],
    'apellido': ['',[ Validators.required , this.spacesValidator]],
    'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
    'sexo': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'terminos': ['', Validators.requiredTrue],
    'clave': ['', [Validators.required,Validators.minLength(6)]],
  });

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');

    return spaces
      ? { containsSpaces: true }
      : null;
  }

  setSexo(genero : string){
    this.sexo.setValue(genero);
  }

  accesoRapido(){
    this.nombre.setValue("Eduardo");
    this.apellido.setValue("Sosa");
    this.email.setValue("Eduardo@gmail.com");
    this.sexo.setValue("Masculino");
    this.edad.setValue("32");
    this.terminos.setValue(true);
  }
  async registrarUsuario() {
    if (this.formularioRegistroUsuario.valid) {
      const usuario = new Usuario("0",this.email.value,this.nombre.value, this.apellido.value,this.edad.value,this.sexo.value,"")

      if(!await this.firebase.checkIfUserExists(usuario.email))
      {
        this.firebase.altaUsuario(usuario,usuario.email,this.clave.value)
        .then(() => {
          console.log('Usuario registrado con éxito.');
          this.router.navigate([""]);
          // Add any additional actions you want to perform after successful registration
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
          // Handle any errors that occur during registration
        });
      }
      else{
        this.toastNotification("El correo ya esta registrado");
      }
     

     
    } else {
      console.warn('Formulario de registro de usuario no válido.');
      // Handle any actions you want to perform when the form is invalid
    }
  }

  async toastNotification(mensaje: string) {
    const toast = await this.toastr.warning("Notificación", mensaje,{
      timeOut: 3000,
    });
  }
}
