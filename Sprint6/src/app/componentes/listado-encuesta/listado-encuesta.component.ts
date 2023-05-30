import { Component } from '@angular/core';
import { Encuesta } from 'src/app/clases/encuesta';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent {
  public listadoEncuestas:Encuesta[]=[];


  constructor(private firebase:FirestoreService){

  }

  async ngOnInit() {
    
    this.listadoEncuestas= await this.firebase.getEncuestas();
     }
}
