import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../servicios/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private servicio: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = this.servicio.getToken();
      if (token){
        let reqClone = req.clone({
          setHeaders: {
          Authorization: `Bearer ${token}`
        }
        });
        return next.handle(reqClone);
      }
        return next.handle(req);
    }
}
