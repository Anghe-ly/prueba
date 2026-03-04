import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../interfaces/producto';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {


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
    precio: new FormControl(0, [
      Validators.required,
      Validators.min(1)
    ])
  })

  onSubmit(){
    if(this.crearForm.valid){
      this.nuevoProducto = this.crearForm.value
      this.servicio.anadirProducto(this.nuevoProducto).subscribe({
        next: ()=>{
          console.log("Producto creado con exito")
          this.servicio.cargarProductos();
          this.router.navigate(["/admin"])
        },
        error:()=>{
          console.log("Error al crear el producto")
        }
      })
    }
  }

  cerrarForm(){
      this.router.navigate(["/admin"])

  }

}
