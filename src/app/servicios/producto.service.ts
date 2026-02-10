import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 private URL: string = "http://localhost:8080/public/"

  constructor(
    private http : HttpClient
  ) { }


  //metodo que muestra la lista de los productos
  mostrarProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.URL}prueba`)}
    


  //metodo que añade un nuevo producto a la bbdd
  anadirProducto(Producto:Producto): Observable<object>{
    return this.http.post(this.URL + "producto", Producto);
  }

  borrarProducto(id: number):Observable<object>{

    return this.http.delete(`${this.URL}eliminar/${id}`)
  }

  editarProducto(id:number, datos:any):Observable<object>{
    return this.http.put(`${this.URL}editar/${id}`, datos)
  }

  obtenerPorID(id: number): Observable<any> {
  
    return this.http.get(`${this.URL}producto/${id}`);
  }

}
