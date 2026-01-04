
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { CarritoService } from '../../servicios/carrito.service';
import { Carrito } from '../../interfaces/carrito';
import { Producto } from '../../interfaces/producto';
import { ProductoCarrito } from '../../interfaces/producto-carrito';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

logueado:boolean = false;
productosCarrito: ProductoCarrito[] = [];

  constructor(
    private router: Router, 
    public authService: AuthService, 
    private carrito: CarritoService
  ){
  }

ngOnInit(){
this.carrito.carrito$.subscribe(datos=>{
  this.productosCarrito = datos.productos;
})
  
}

  redirigirProducto(){
  this.router.navigate(["./producto"])
}

redirigirLista(){
  this.router.navigate(["./lista"])
}

redirigirCarrito(){
    this.router.navigate(['/carrito']); 
}

redirigirHome(){

  this.router.navigate([""])
}


  cerrarSesion() {
    this.authService.logout()
}

}
