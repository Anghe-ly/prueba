import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private URL: string = environment.apiUrl

 logeado: boolean = false;

  constructor(
    private http : HttpClient
  ) { }


  anadirUser(user:Usuario):Observable<object>{
    return this.http.post(`${this.URL}/public/usuario`, user)
  }

  obtenerPorID(id: number): Observable<any> {
    return this.http.get(`${this.URL}/public/usuario/${id}`);
  }

  //servicio para iniciar sesion 
  iniciarSesion(username: string, password: string): Observable<any> {

        this.logeado = true; //actualiza el estado de logueo

    return this.http.post(`${this.URL}/login/auth`, { username, password }, {
      withCredentials: true
    });

  }

 }
