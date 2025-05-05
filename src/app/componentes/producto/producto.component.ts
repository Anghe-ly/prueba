import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

 hayError: boolean = false

nuevoProducto : Producto = {
  nombre: "",
  idproducto: 0
}

      constructor(
        private router: Router,
        private servicio: ProductoService
      ) {}


mostrarError(){
  this.hayError = true 

  setTimeout(() => {
    this.hayError = false
  }, 5000);
}

//validacion del formulario
validarFormulario: FormGroup = new FormGroup({

  nombre: new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ])
})

  onSubmit(){

  if(this.validarFormulario.valid){
      
  this.nuevoProducto = this.validarFormulario.value
  this.servicio.anadirProducto(this.nuevoProducto).subscribe(dato => {
    console.log(dato)
    this.router.navigate(["./lista"])
  }, error => this.hayError = false)

    }else{
      //CAMBIAR LUEGO POR UNA PAGINA DE ERROR APROPIADA (en ello)
    this.mostrarError()
    }

  }

}
