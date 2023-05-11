import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioAut: any;
  constructor(private firebase: FirestoreService, private router:Router) {
  }
  ngOnInit(): void {
    this.firebase.token$.subscribe((token) => {
      if (token !== '') {
        this.usuarioAut = true;
      } else {
       this.usuarioAut = localStorage.getItem('token');
      }
    });
  }

  logOut(){
    this.firebase.cerrarSeccion();
    this.router.navigate(['usuario/ingreso']);
    localStorage.setItem('token',"");
  }
}
