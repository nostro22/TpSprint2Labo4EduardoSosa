import { Component, Input, SimpleChanges } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Pelicula } from 'src/app/clases/pelicula';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent {
 @Input() detalleRecibido?: any;
 
  constructor(private fb: FormBuilder, private firestore: FirestoreService) {
  }
  get nombre() {
    return this.formUser.get('nombre') as FormControl;
  }
  get tipo() {
    return this.formUser.get('tipo') as FormControl;
  }
  get fecha() {
    return this.formUser.get('fecha') as FormControl;
  }
  get cantidad() {
    return this.formUser.get('cantidad') as FormControl;
  }
  get foto() {
    return this.formUser.get('foto') as FormControl;
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    // TODO: Modify the image using the selected file
  }


  altaPelicula() {
    this.firestore.altaPelicula(new Pelicula(
      '22',
      this.nombre.value,
      this.tipo.value,
      this.fecha.value,
      this.cantidad.value,
      this.foto.value
    ));
  }

  formUser = this.fb.group({
    'nombre':
      ["",
        [
          Validators.required
        ]
      ],
    'tipo':
      ["",
        [
          Validators.required
        ]
      ],
    'fecha':
      ["",
        [
          Validators.required
        ]
      ],
    'cantidad':
      ["",
        [
          Validators.required
        ]
      ],
    'foto':
      ["",
        [
          Validators.required
        ]
      ],

  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detalleRecibido'] && changes['detalleRecibido'].currentValue) {
      const detalle = changes['detalleRecibido'].currentValue;
      this.formUser.patchValue({
        nombre: detalle.nombre || '',
        tipo: detalle.tipo || '',
        fecha: detalle.fechaDeEstreno ? new Date(detalle.fechaDeEstreno).toISOString().substr(0, 10) : '',
        cantidad: detalle.cantidadDePublico || '',
        foto: detalle.fotoPelicula || ''
      });
    }
  }
  


}
