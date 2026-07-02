import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Carrito } from '../../interfaces/carrito';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';
import { Producto } from '../../interfaces/producto';
import { ProductoCarrito } from '../../interfaces/producto-carrito';
import { Router } from '@angular/router';
import { CompraService } from '../../servicios/compra.service';



declare var bootstrap: any; 

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements AfterViewInit {

//variables para el toast
toastVisible: boolean = false;
toastMensaje: string = "";
toastClase: string = 'bg-success';


//variables del carrito
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

  valorActual: number = 1;

  constructor(
    private servicio: CarritoService,
    private auth: AuthService,
    private router: Router,
    private compraServicio: CompraService
    
  ) {}


  ngOnInit(): void {
 if (this.auth.logueado()) {
      const idUsuario = this.auth.getUsuarioId();
      this.servicio.cargarCarrito(idUsuario!);
 }
  this.servicio.carrito$.subscribe((carritoData: Carrito) => {
     this.carrito = carritoData;
   });
  }


  //logica para el MODAL de boostrap
  ngAfterViewInit() {
    const carritoModal = document.getElementById('carritoModal');
   
      const modal = new bootstrap.Modal(carritoModal);
      modal.show();
 }

  


  eliminarProducto(idProducto: number){
    if(this.auth.logueado()){
      const idUsuario = this.auth.getUsuarioId()!;

      this.servicio.eliminarProductoCarrito(idProducto, idUsuario)
      .subscribe({
        next: ()=> {
          this.servicio.cargarCarrito(idUsuario);
        },
        error:()=>{
          this.mostrarToast("Error al eliminar el producto del carrito", "danger");
        }
      })
    }
  }

  cerrarCarrito(){
  window.history.back();

  }


  onSubmit(){
   
    const idUsuario = this.auth.getUsuarioId();

    this.compraServicio.crearCompra(idUsuario!).subscribe({
      next: () =>{
      this.mostrarToast("Se ha realizado la compra con exito", "success")
     
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('carritoModal'));
          if (modal) modal.hide();

         this.router.navigate(["/dashboard"])
      }, 2000);
      },

      error:() =>{
        this.mostrarToast("Error al hacer la compra", "danger");
      }

    })
  
  }


  actualizarCantidad(producto: ProductoCarrito, cantidad:number){

    const idUsuario = this.auth.getUsuarioId();
    const nuevaCantidad = producto.cantidad + cantidad;

    if(idUsuario === null || nuevaCantidad < 0){
      return;
    }

    producto.cantidad = nuevaCantidad;

    this.servicio.agregarProductoCarrito(producto.producto!, nuevaCantidad).subscribe({
      error: ()=>{
        this.mostrarToast("Error al actualizar la cantidad del producto en el carrito", "danger");
      }
    })

  }

  //toast
   mostrarToast(mensaje:string, tipo: 'success' | 'danger'){
  this.toastMensaje = mensaje;
  this.toastClase = `bg-${tipo}`;
  this.toastVisible = true;

  setTimeout(() => {
    this.toastVisible = false;
  }, 2000);
 }

}
