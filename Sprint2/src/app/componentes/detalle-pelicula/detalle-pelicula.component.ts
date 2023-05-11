import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent {
  @Input() detalleRecibido?:any;
  @Output() eventoParaDetalle:EventEmitter<any> = new EventEmitter<any>();
  limpiar(){
    this.eventoParaDetalle.emit();
  }

  
}
