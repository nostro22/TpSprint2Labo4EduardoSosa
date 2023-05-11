import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pelicula } from 'src/app/clases/pelicula';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent {
  constructor() {
    const aCollection = collection(this.firestore, 'items')
    const bCollection = collection(this.firestore, 'peliculas')
    this.items$ = collectionData(aCollection);
    this.peliculas$ = collectionData(bCollection).pipe(
      map((peliculas: any[]) => peliculas.map(pelicula => new Pelicula(pelicula.id, pelicula.nombre, pelicula.tipo,pelicula.fechaDeEstreno.toDate(),pelicula.cantidadDePublico,pelicula.fotoDeLaPelicula)))
    );
  }
  
  @Output() eventoParaDetalle:EventEmitter<any> = new EventEmitter<any>();
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
   peliculas$: Observable<any[]>;

  selecionarProducto(unProducto:any)
  {
    this.eventoParaDetalle.emit(unProducto);
    console.info("En el listado", unProducto);
  }
  
}
