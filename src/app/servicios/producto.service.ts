import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 private URL: string = "http://localhost:8080/"

private productosSubject = new BehaviorSubject<Producto[]>([]);
productos$ = this.productosSubject.asObservable();


  constructor(
    private http : HttpClient
  ) { }

//metodo para actualizar el observable de lista de productos
 cargarProductos(){
  this.mostrarProductos().subscribe(
    productos => this.productosSubject.next(productos)
  )
 }

  //metodo que muestra la lista de los productos
  mostrarProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.URL}public/prueba`)}
    



  //metodo para añadir producto con imagen
anadirProducto(producto:Producto, file:File):Observable<any>{

  const formData = new FormData();

  formData.append("producto", new Blob([JSON.stringify(producto)],
  {type: "application/json"}
));

formData.append("file", file);

return this.http.post(`${this.URL}api/admin/producto`, formData);


}


  borrarProducto(id: number):Observable<object>{

    return this.http.delete(`${this.URL}api/admin/eliminar/${id}`)
  }

  editarProducto(id:number, datos:any):Observable<object>{
    return this.http.put(`${this.URL}api/admin/editar/${id}`, datos)
  }

  obtenerPorID(id: number): Observable<any> {
  
    return this.http.get(`${this.URL}public/producto/${id}`);
  }

}
