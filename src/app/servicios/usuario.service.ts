import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private URL: string = "http://localhost:8080/public/"

 logeado: boolean = false;

  constructor(
    private http : HttpClient
  ) { }


  anadirUser(user:Usuario):Observable<object>{
    return this.http.post(`${this.URL}usuario`, user)
  }

  obtenerPorID(id: number): Observable<any> {
    return this.http.get(`${this.URL}usuario/${id}`);
  }

  //servicio para iniciar sesion 
  iniciarSesion(username: string, password: string): Observable<any> {

        this.logeado = true; //actualiza el estado de logueo

    return this.http.post('http://localhost:8080/login/auth', { username, password }, {
      withCredentials: true
    });

  }

 }
