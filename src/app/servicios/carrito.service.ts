import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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


    mostrarCarrito(idUsuario: number):Observable<object>{
      return this.http.get(`${environment.apiUrl}/private/${idUsuario}/carrito`)
    }

    agregarProductoCarrito(producto: Producto, cantidad: number): void {

      if(this.auth.logueado()){
        const idUsuario = this.auth.getUsuarioId();

        if(idUsuario === null || isNaN(idUsuario)){

           console.log("El id del usuario no es valido")
            return;
        }

        this.agregarProducto(idUsuario, producto.idProducto, cantidad)
        .subscribe({
          next: ()=>{
            console.log("Producto agregado al carrito")
            this.cargarCarrito(idUsuario);
          },
          error:()=>{
            console.log("Error al agregar el producto al carrito")
          }
        })

      }else{
        console.log("Usuario no logueado. No se puede agregar al carrito.")
        return;
      }
    }

     agregarProducto(idUsuario:number, idProducto: number, cantidad:number):Observable<object>{
        return this.http.post(`${environment.apiUrl}/private/${idUsuario}/agregar`, 
        {},
        {params: {
           idProducto, cantidad
        }}
      );
    }

 
    eliminarProductoCarrito(idProducto:number, idUsuario:number): Observable<object>{

    
      return this.http.delete(`${environment.apiUrl}/private/${idUsuario}/eliminar`,
      {params: {idProducto}
      });
    }

}
