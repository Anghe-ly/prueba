import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito';
import { Usuario } from '../../interfaces/usuario';
import { Carrito } from '../../interfaces/carrito';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';

declare var bootstrap: any; // Importa Bootstrap JS globalmente

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements AfterViewInit {
  carrito: Carrito = {
    id: 0,
    total: 0,
    cantidadTotal: 0,   
    fechaCompra: new Date(),
    usuario: {
      idUsuario: 0,
      user: "",
      correo: "", 
      password: ""
    },
    productos: []
  } 

  
  constructor(
    private servicio: CarritoService,
   // private auth: AuthService
  ) {}

  //logica para el MODAL de boostrap
  ngAfterViewInit() {
    const modalElement = document.getElementById('carritoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

    this.cargarCarrito();
  }

  cargarCarrito(){
    let idUsuario = this.carrito.usuario.idUsuario
    this.servicio.mostrarCarrito(idUsuario).subscribe((data: any) => {
      this.carrito = data;
    })
  }

  onSubmit(){
    alert("Compra realizada con éxito");
  }
}
