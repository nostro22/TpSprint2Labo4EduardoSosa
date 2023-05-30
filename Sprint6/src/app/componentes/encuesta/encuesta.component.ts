import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encuesta } from 'src/app/clases/encuesta';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  public constructor(
    private fb: FormBuilder,
    private firebase: FirestoreService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  get nombre() {
    return this.formularioEncuesta.get('nombre') as FormControl;
  }

  get apellido() {
    return this.formularioEncuesta.get('apellido') as FormControl;
  }

  get edad() {
    return this.formularioEncuesta.get('edad') as FormControl;
  }
  get telefono() {
    return this.formularioEncuesta.get('telefono') as FormControl;
  }

  get inputPreferido() {
    return this.formularioEncuesta.get('inputPreferido') as FormControl;
  }
  get recomendacion() {
    return this.formularioEncuesta.get('textarea') as FormControl;
  }
  get ahorcado() {
    return this.formularioEncuesta.get('preference1') as FormControl;
  }
  get mayorMenor() {
    return this.formularioEncuesta.get('preference2') as FormControl;
  }
  get trivia() {
    return this.formularioEncuesta.get('preference3') as FormControl;
  }
  get asteroides() {
    return this.formularioEncuesta.get('preference4') as FormControl;
  }

  preferenceValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const preferences = ['preference1', 'preference2', 'preference3', 'preference4'];
    const selectedPreferences = preferences.filter(preference => control.get(preference)?.value === true);
    return selectedPreferences.length >= 1 ? null : { requireOnePreference: true };
  };

  public formularioEncuesta = this.fb.group({
    nombre: ['', [Validators.required, this.spacesValidator]],
    apellido: ['', [Validators.required, this.spacesValidator]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]],
    inputPreferido: ['', Validators.required],
    textarea: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(100)]],
    preference1: [false],
    preference2: [false],
    preference3: [false],
    preference4: [false]
  }, { validators: this.preferenceValidator });

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = control.value as string;
    const spaces = nombre?.includes(' ');

    return spaces ? { containsSpaces: true } : null;
  }

  setInputPreferido(inputPreferido: string) {
    this.inputPreferido.setValue(inputPreferido);
  }

  juegosJugados() {
    let recomendacion = [];
    if (this.ahorcado.value) {
      recomendacion.push('ahorcado');
    }
    if (this.mayorMenor.value) {
      recomendacion.push('mayor ó Menor');
    }
    if (this.trivia.value) {
      recomendacion.push('trivia');
    }
    if (this.asteroides.value) {
      recomendacion.push('asteroides');
    }
    return recomendacion;
  }

  async subirEncuesta() {
    let jugados = this.juegosJugados();
    let fecha = new Date().toLocaleString('es-AR');
    if (this.formularioEncuesta.valid) {
      const encuesta = new Encuesta(this.firebase.usuarioAutenticado.email, this.nombre.value, this.apellido.value, this.edad.value, this.telefono.value, this.inputPreferido.value, this.recomendacion.value, jugados,fecha)
    console.log(encuesta);
    this.firebase.uploadEncuesta(encuesta);
    this.firebase.toastNotificationSuccess("Encuesta subida con exito, gracias por tu devolucion");
    this.formularioEncuesta.reset();
    } else {
      console.warn('Formulario de encuesta no válido.');
      // Handle any actions you want to perform when the form is invalid
    }
  }
}
