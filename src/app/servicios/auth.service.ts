import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


// ...existing code...
login(username: string, password: string): Observable<{token: string}> {
  return this.http.post<{ token: string }>(`${this.apiUrl}login/auth`, { username, password })//REVISAR SI SIRVE SOLO CON LOGIN
    .pipe(
      tap((response: { token: string }) => {
        localStorage.setItem('token', response.token);
      })
    );
}

//metodo de Logout que elimina el token y luego te lleva al login de nuevo
logout(): void{
  localStorage.removeItem('token');
  this.router.navigate(['/inicio-sesion']);
}

//metodo que obtiene el token almacendo en el localStorage
getToken(): string | null {
  return localStorage.getItem('token');
}
  }
//fin del authService
