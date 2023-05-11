import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Usuario } from 'src/app/clases/usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {
  readmeContent?: SafeHtml;
  usuario?:any;

  constructor(private http: HttpClient,private sanitizer: DomSanitizer, private firebase:FirestoreService) { }

  ngOnInit() {
   this.usuario =this.firebase.getUserData();
    
  }
}
