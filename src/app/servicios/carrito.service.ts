import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito';
import { ProductoCarrito } from '../interfaces/producto-carrito';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
 //private URL: string = "http://localhost:8080/private"


  constructor(
        private http : HttpClient
  ) { }

  
    mostrarCarrito(id: number):Observable<object>{
      return this.http.get(`${environment.apiUrl}/private/${id}carrito`)
    }

    agregarProducto(id: number, producto: ProductoCarrito): Observable<object> {
      return this.http.post(`${environment.apiUrl}/${id}agregar`, producto);
    }
}
