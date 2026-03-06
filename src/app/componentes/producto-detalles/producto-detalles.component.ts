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



imagenesProducto:String[] = [
"/img/labial1.png",
"/img/labial2.png",
"/img/labial3.png"
]

producto: Producto = {
  nombre: "",
  precio: 0,
  idProducto: 0
}


constructor(
  private route: ActivatedRoute,
  private servicio: ProductoService,
  private carrito: CarritoService,

  private router: Router,
  private auth: AuthService
){}

ngOnInit(): void{
const id = Number(this.route.snapshot.paramMap.get('id'));

  this.servicio.obtenerPorID(id).subscribe(datos=>{
    this.producto = datos;

  })
  }


    agregarCarrito(producto: Producto){
  
    if(this.auth.logueado()){
      

      this.carrito.agregarProductoCarrito(producto, 1)
      .subscribe(() => {
        this.router.navigate(["carrito"]);
      });
    }else{
      this.router.navigate(["inicio-sesion"]);
    }


}

/*
alertaProducto(){
  const toastTrigger = document.getElementById('botonAgregarCarrito')
  const toastProducto = document.getElementById('toastProducto')


  if(toastTrigger){
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastProducto)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show();
    })
  }
}*/

}

