import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

//variables para el toast
toastVisible: boolean = false;
toastMensaje: string = "";
toastClase: string = 'bg-success';


imgProducto! : File;

  nuevoProducto : Producto = {
    nombre: "",
    idProducto: 0,
    precio: 0
  }

  constructor(
    private router: Router, 
    private servicio: ProductoService
  ){}

  //validacion del formulario 

  crearForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    precio: new FormControl(null, [
      Validators.required,
    ]),
    
    img: new FormControl("", [
      Validators.required,
    ])
  })

  onSubmit(){
    if(this.crearForm.valid && this.imgProducto){
      this.nuevoProducto = this.crearForm.value
      this.servicio.anadirProducto(this.nuevoProducto, this.imgProducto).subscribe({
        next: ()=>{
          this.mostrarToast("Producto creado con éxito", "success");
          this.servicio.cargarProductos();

          setTimeout(() => {
          this.router.navigate(["/admin"])
          }, 1000);

        },
        error:()=>{
          this.mostrarToast("Error al crear el producto", "danger");
        }
      })
    }
  }

  //metodo que guarda la imagen en una constante y se lanza con el evento del html 
    onFileSelected(event: any): void {
      const file: File = event.target.files[0]
      if(file){
        this.imgProducto = file;
      }
    }

  cerrarForm(){
      this.router.navigate(["/admin"])

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
