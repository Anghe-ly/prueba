import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Carrito } from '../../interfaces/carrito';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';
import { Producto } from '../../interfaces/producto';

declare var bootstrap: any; 

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements AfterViewInit {


  carrito: Carrito = {
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

  constructor(
    private servicio: CarritoService,
    private auth: AuthService,
    
  ) {}


  ngOnInit(): void {
  this.servicio.carrito$.subscribe((carritoData: Carrito) => {
     this.carrito = carritoData;
   });
  }


  //logica para el MODAL de boostrap
  ngAfterViewInit() {
    const carritoModal = document.getElementById('carritoModal');
    if (carritoModal && this.auth.logueado()) {
      const idUsuario = this.auth.getUsuarioId();
      this.servicio.cargarCarrito(idUsuario!);
      const modal = new bootstrap.Modal(carritoModal);
      modal.show();
 }

  }


  eliminarProducto(idProducto: number){
    if(this.auth.logueado()){
      const idUsuario = this.auth.getUsuarioId()!;

      this.servicio.eliminarProductoCarrito(idProducto, idUsuario)
      .subscribe({
        next: ()=> {
          console.log("Producto eliminado del carrito");
          this.servicio.cargarCarrito(idUsuario);
        },
        error:()=>{
          console.log("Error al eliminar el producto del carrito");
        }
      })
    }
  }

  cerrarCarrito(){
  window.history.back();

  }


  onSubmit(){
    alert("Compra realizada con éxito");
  }
}
