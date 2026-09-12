declare var bootstrap: any;

import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './producto-detalles.component.html',
  styleUrl: './producto-detalles.component.css'
})
export class ProductoDetallesComponent {



producto: Producto = {
  nombre: "",
  precio: 0,
  idProducto: 0,
  img: ""
}


constructor(
  private route: ActivatedRoute,
  private servicio: ProductoService,
  private carrito: CarritoService,

  private router: Router,
  private auth: AuthService
){}

ngOnInit(): void{
const id = Number(this.route.snapshot.paramMap.get("id"));

  this.servicio.obtenerPorID(id).subscribe(datos=>{
    this.producto = datos;
  })
  }


    agregarCarrito(producto: Producto){
  
    if(this.auth.logueado()){
      const idUsuario = this.auth.getUsuarioId()!;

      if(idUsuario === null){
        this.router.navigate(["inicio-sesion"]);
      }

     
      this.carrito.mostrarCarrito(idUsuario).subscribe(
        carrito=>{
          const productoExistente = carrito.productos.find(pc => pc.producto?.idProducto === producto.idProducto)
          const cantidadFinal = productoExistente ? productoExistente.cantidad + 1 : 1
       
        this.carrito.agregarProductoCarrito(producto, cantidadFinal)
      .subscribe(() => {
        this.router.navigate(["carrito"]);
      });

        });

    }else{
      this.router.navigate(["inicio-sesion"]);
    }


}



}

