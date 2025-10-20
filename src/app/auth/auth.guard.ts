import { Injectable } from "@angular/core";
import { AuthService } from "../servicios/auth.service";
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuards implements CanActivate {

    constructor(
        private servicio: AuthService, 
        private router: Router
    ){}

    canActivate(): boolean{
        if(this.servicio.getToken()){
            return true;
        }else {
            this.router.navigate(['/inicio-sesion']);
            return false;
        }
    }
}
