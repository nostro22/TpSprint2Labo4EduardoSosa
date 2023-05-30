import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.css']
})
export class ListadoResultadosComponent {
  public listadoAhorcado: any[] = [];
  public listadoMayorMenor: any[] = [];
  public listadoPreguntados: any[] = [];
  public listadoAsteroides: any[] = [];
  public selectedValue="0";
  constructor(private firebase: FirestoreService) {
  }

  onValueChange(event: Event): void {
    this.selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected value:', this.selectedValue);
  }
  async ngOnInit() {
    this.listadoAhorcado = await this.firebase.getResultadosAhorcado();
    this.listadoMayorMenor = await this.firebase.getResultadosMayorMenor();
    this.listadoPreguntados = await this.firebase.getResultadosPreguntados();
    this.listadoAsteroides = await this.firebase.getResultadosAsteroides();
  }
}
