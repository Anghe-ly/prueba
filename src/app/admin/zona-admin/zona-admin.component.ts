import { Component } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { CarritoService } from '../../servicios/carrito.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zona-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './zona-admin.component.html',
  styleUrl: './zona-admin.component.css',
})
export class ZonaAdminComponent {

  //VARIABLES

  //variables de alertas y forms
  toastVisible:boolean = false;
  toastMensaje:String = "";
  toastClase:string = "success";

  mostrarFormCrear: boolean = false;
  mostrarFormEditar: boolean = false;

 //variables de producto
  listaProducto: Producto[] = [];

  producto: Producto = {
    nombre: '',
    idProducto: 0,
    precio: 0,
  };

  

  constructor(
    
      private servicioProducto: ProductoService,
      private router: Router,
      private servicioCarrito: CarritoService,
      private authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.servicioProducto.mostrarProductos().subscribe({
      next: (datos) => {
        this.listaProducto = datos;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      },
    });
  }

  eliminarProducto(id: number) {
     this.servicioProducto.borrarProducto(id).subscribe(datos=> {
      this.router.navigate(["lista"])
    })
  }

  //metodos para EDITAR producto
  //validacion del formulario
  editarForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    precio: new FormControl('', [Validators.required]),
  });

  editarProducto(id: number) {
    this.mostrarFormEditar = true;
  }

  onSubmitEditar() {
    if (this.editarForm.valid) {
      this.editarForm.patchValue({
        nombre: this.producto.nombre,
        precio: this.producto.precio,
      });
      this.servicioProducto
        .editarProducto(this.producto.idProducto, this.editarForm.value)
        .subscribe({
          next: () => {
            console.log('Producto editado con exito');
          },
          error: () => {
            console.error('Error al editar el producto');
          },
        });
    }
  }

  cerrarFormEditar() {
    this.mostrarFormEditar = false;
  }



  //Metodos para mostrar las alertas 

  mostrarToast(mensaje:String, tipo: "success" | "danger"){
    this.toastMensaje = mensaje;
    this.toastClase = `bg-${tipo}`;
    this.toastVisible = true;

  }

  cerrarToast(){
    this.toastVisible = false;
  }
  

  redirigirDetalles(id:number){
    this.router.navigate(["producto", this.producto.idProducto])
  }
}
