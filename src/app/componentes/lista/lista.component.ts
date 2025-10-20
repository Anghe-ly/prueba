import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../servicios/producto.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl:'./lista.component.css'
})
export class ListaComponent implements OnInit {

  producto : Producto = {
  nombre: "", 
  idproducto: 0
  }
    listaProducto: Producto[] = [] 
  

    constructor(
      private servicio: ProductoService,
      private router: Router,
      private servicioCarrito: CarritoService
      
      
    ) {}


  ngOnInit(): void {

    this.servicio.mostrarProductos().subscribe(datos => {
      this.listaProducto = datos
    })

  }

  eliminarProducto(id:number){
    this.servicio.borrarProducto(id).subscribe(datos=> {
      this.router.navigate(["lista"])
    })
  }

  redirigirEditar(idproducto:number){
    this.router.navigate(["editar",idproducto])
    
  }

  agregarCarrito(){

    this.router.navigate(["carrito"])
  }

}
