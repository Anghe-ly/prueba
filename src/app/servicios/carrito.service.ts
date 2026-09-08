import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';
import { Carrito } from '../interfaces/carrito';
import { environment } from '../../environments/environment.development';
import { Producto } from '../interfaces/producto';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Carrito = {
    total: 0,
    cantidadTotal: 0,   
    fechaCompra: new Date(),
    usuario: {
      user: "",
      correo: "", 
      password: ""
    },
    productos: []
  };


  private carritoSubject = new BehaviorSubject<Carrito>(this.carrito);
  carrito$ = this.carritoSubject.asObservable();


  constructor(
        private http : HttpClient, 
        private auth: AuthService
  ) {}

  
    cargarCarrito(idUsuario: number) {
    this.mostrarCarrito(idUsuario)
      .subscribe(carritoData => this.carritoSubject.next(this.carrito = carritoData as Carrito));
  }


    mostrarCarrito(idUsuario: number):Observable<Carrito>{
      return this.http.get<Carrito>(`${environment.apiUrl}/private/${idUsuario}/carrito`)
    }

  agregarProductoCarrito(producto: Producto, cantidad: number): Observable<Carrito> {

 
    
    if(!this.auth.logueado()){
      return throwError(() => new Error("Usuario no loguea"));
    }

    const idUsuario = this.auth.getUsuarioId();
    if(idUsuario === null || isNaN(idUsuario)){

      return throwError(() => new Error("ID de usuario no válido"));
    }

  
      return this.agregarProducto(idUsuario, producto.idProducto, cantidad).pipe(
      switchMap(() => this.mostrarCarrito(idUsuario)),
      tap(carrito => this.carritoSubject.next(this.carrito = carrito))
    );
  
  }

     
  agregarProducto(idUsuario:number, idProducto: number, cantidad:number):Observable<object>{
        return this.http.post<Carrito>(`${environment.apiUrl}/private/${idUsuario}/agregar`, 
        {},
        {params: {
           idProducto, cantidad
        }}
      );
    }

 
    eliminarProductoCarrito(idProducto:number, idUsuario:number): Observable<object>{

    
      return this.http.delete<Carrito>(`${environment.apiUrl}/private/${idUsuario}/eliminar`,
      {params: {idProducto}
      });
    }

    eliminarCarrito(idUsuario:number):Observable<object>{
      return this.http.delete<Carrito>(`${environment.apiUrl}/private/${idUsuario}/vaciar`)
    }

}
