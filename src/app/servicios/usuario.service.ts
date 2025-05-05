import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private URL: string = "http://localhost:8080/api/"

  constructor(
    private http : HttpClient
  ) { }


  anadirUser(user:Usuario):Observable<object>{
    return this.http.post(`${this.URL}usuario`, user)
  }

  obtenerPorID(id: number): Observable<any> {
    return this.http.get(`${this.URL}usuario/${id}`);
  }

 }
