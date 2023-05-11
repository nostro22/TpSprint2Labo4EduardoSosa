import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pelicula } from 'src/app/clases/pelicula';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent {
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  peliculas$: Observable<any[]>;
  @Output() eventoParaDetalle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    const bCollection = collection(this.firestore, 'peliculas')
    this.items$ = collectionData(aCollection);
    this.peliculas$ = collectionData(bCollection).pipe(
      map((peliculas: any[]) => peliculas.map(pelicula => new Pelicula(pelicula.id, pelicula.nombre, pelicula.tipo, pelicula.fechaDeEstreno.toDate(), pelicula.cantidadDePublico, pelicula.fotoDeLaPelicula)))
    );
  }

  selecionarProducto(pelicula: any) {
    this.eventoParaDetalle.emit(pelicula);
    console.info("En el listado", pelicula);
  }
}
