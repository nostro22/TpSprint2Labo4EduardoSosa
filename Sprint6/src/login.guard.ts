import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './app/servicios/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private firebase:FirestoreService, private router:Router){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isUsuario = await this.firebase.esUsuario();
    if (isUsuario) {
      console.log('Usuario esta logeado:', isUsuario);
      return true; 
    } else {
      this.router.navigateByUrl('/usuario/ingreso');
      return false; 
    }
  }
  
}
