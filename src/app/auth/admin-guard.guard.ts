import { Injectable } from "@angular/core";
import { AuthService } from "../servicios/auth.service";
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private servicio: AuthService, 
        private router: Router
    ){}

    canActivate(): boolean{
    
    if (!this.servicio.getToken()) {
      this.router.navigate(['/inicio-sesion']);
      return false;
    }

    if (!this.servicio.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
    

}
