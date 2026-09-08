import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../servicios/producto.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';


  

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrl:'./lista.component.css'
})
export class ListaComponent implements OnInit {

  listaProducto: Producto[] = [] 
  

    constructor(
      private servicio: ProductoService,
      private router: Router,
      private servicioCarrito: CarritoService,
      private authService: AuthService
      
      
    ) {}


  ngOnInit(): void {

    this.servicio.mostrarProductos().subscribe(datos => {
      this.listaProducto = datos
    })

  }


  redirigirDetalles(idproducto:number){
    this.router.navigate(["producto",idproducto])
  }


   obtenerCarrito(){
  
      if(this.authService.logueado()){
       const idUsuario = this.authService.getUsuarioId()!;//por que se usa ! al final
        this.servicioCarrito.mostrarCarrito(idUsuario).subscribe({
          next: () =>{
            console.log("Carrito cargado");},
            error (error) {
              console.log("no se ha podido obtener el carrito", error)
            }
        })
      }
    }

  //metodo que añade el producto clickeado al carrito deu usuario logueado
  agregarCarrito(producto: Producto){
  
    if(this.authService.logueado()){
      const idUsuario = this.authService.getUsuarioId()
      if(idUsuario === null){
        return;
      }

      this.servicioCarrito.mostrarCarrito(idUsuario).subscribe( carrito=>{
        const productoExistente = carrito.productos.find(pc => pc.producto?.idProducto === producto.idProducto)
        const cantidadFinal = productoExistente ? productoExistente.cantidad + 1 : 1
      
      this.servicioCarrito.agregarProductoCarrito(producto, cantidadFinal)
        .subscribe(() => {
        this.router.navigate(["carrito"]);
      });
      
      });

    }else{
      this.router.navigate(["inicio-sesion"]);
    }

  }
}
