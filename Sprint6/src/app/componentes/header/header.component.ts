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

  constructor(
    private firebase: FirestoreService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.firebase.token$.subscribe((token) => {
      if (token !== '') {
        this.usuarioAut = true;
      } else {
        this.usuarioAut = localStorage.getItem('token');
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
      this.cd.detectChanges();
    } catch (error) {
      console.error('Error fetching isAdmin:', error);
    }
  }
}
