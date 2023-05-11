import { Component } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  vista: boolean = true;
  productoAMostrar!: any[];

  cambiarVista() {
    this.vista = !this.vista;
  }
  detalleRecibidoMain($event: any) {
    this.productoAMostrar = $event;
    console.info("En el mail",$event);
  }
}
