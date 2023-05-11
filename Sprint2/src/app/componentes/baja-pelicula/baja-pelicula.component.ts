import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-baja-pelicula',
  templateUrl: './baja-pelicula.component.html',
  styleUrls: ['./baja-pelicula.component.css']
})
export class BajaPeliculaComponent {
  @Input() detalleRecibido?:any;
  constructor(private firestore: FirestoreService) {}

  borrarPelicula(){
    // const docRef = doc(this.firestore,'peliculas/',this.detalleRecibido.id);
    // deleteDoc(docRef);
    this.firestore.borrar("peliculas",this.detalleRecibido.id);
  }

  
}
