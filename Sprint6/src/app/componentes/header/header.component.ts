import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioAut: any;
  isAdmin: any;
  nombreUsuario:string="";
  constructor(
    private firebase: FirestoreService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.firebase.token$.subscribe(async (token) => {
      if (token !== '') {
        this.usuarioAut = true;
      } else {
        this.usuarioAut = localStorage.getItem('token');
        if(this.usuarioAut!="")
        {
          this.usuarioAut = await this.firebase.getUserByUID(this.usuarioAut);
          this.nombreUsuario = this.usuarioAut.nombre;
        }
      }
    });

    try {
      this.isAdmin = await this.firebase.esAdministrador();
      this.cd.detectChanges();
    } catch (error) {
      console.error('Error fetching isAdmin:', error);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshComponent();
      }
    });
  }

  logOut() {
    this.firebase.cerrarSeccion();
    this.router.navigate(['usuario/ingreso']);
    localStorage.setItem('token', '');
  }

  async refreshComponent(): Promise<void> {
    try {
      this.isAdmin = await this.firebase.esAdministrador();
      if(localStorage.getItem("token")!="")
      {
        this.nombreUsuario = this.usuarioAut.email;
        this.usuarioAut = localStorage.getItem('token');
        this.usuarioAut = await this.firebase.getUserByUID(this.usuarioAut);
        this.nombreUsuario = this.usuarioAut.nombre;
      }else
      {
        this.nombreUsuario="";
      }
      this.cd.detectChanges();
    } catch (error) {
      console.error('Error fetching isAdmin:', error);
    }
  }
}
