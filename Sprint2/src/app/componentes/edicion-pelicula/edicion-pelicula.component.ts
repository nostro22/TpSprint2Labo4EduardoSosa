import { Component, Input, SimpleChanges } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

@Component({
  selector: 'app-edicion-pelicula',
  templateUrl: './edicion-pelicula.component.html',
  styleUrls: ['./edicion-pelicula.component.css']
})
export class EdicionPeliculaComponent {
  @Input() detalleRecibido?: any;
 
  constructor(private fb: FormBuilder, private firestore: Firestore) {
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


  modificar() {
    const docRef = doc(this.firestore, "peliculas", this.detalleRecibido.id);
    updateDoc(docRef,
      {
        id: this.detalleRecibido.id,
        nombre: this.nombre.value,
        tipo: this.tipo.value,
        fechaDeEstreno:new Date(this.fecha.value),
        cantidadDePublico: this.cantidad.value,
        fotoDeLaPelicula: this.foto.value
      }
    );
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
        fecha: detalle.fechaDeEstreno ? detalle.fechaDeEstreno.toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10),
        cantidad: detalle.cantidadDePublico || '',
        foto: detalle.fotoPelicula || ''
      });
    }
  }
  


}
