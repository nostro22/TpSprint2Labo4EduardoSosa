import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './app/servicios/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private firebase:FirestoreService, private router:Router){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isUsuario = await this.firebase.esAdministrador();
    if (isUsuario) {
      console.log('Usuario es administrador:', isUsuario);
      return true; 
    } else {
      return this.router.parseUrl('/error');
    }
  }
  
}
