import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {


   prod : Producto = {
    nombre: "",
    idProducto: 0,
    precio: 0
  }

 // productoID!: number

      constructor(
        private servicio: ProductoService,
        private router: Router, 
        private ruta: ActivatedRoute
        
      ) {}
  


ngOnInit(): void{
  this.ruta.params.subscribe(params => {
  this.prod.idProducto = +params['id']


  if(isNaN(this.prod.idProducto) || this.prod.idProducto <= 0){
  console.log("El ID no es un numero" + params['id']) 
}
  this.obtenerProducto(this.prod.idProducto)
  })
} 


obtenerProducto(id:number):void{
this.servicio.obtenerPorID(id).subscribe({
  next: (producto) => {
    this.editarForm.patchValue(producto) //esto hace que aparezca e nombre actual del producto a editar
  }, 
  error: (error)=>{
    console.error("error al obtener producto por ID", error)
  }
});
}

//validacion del formulario
editarForm: FormGroup = new FormGroup({

  nombre: new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ])
})


//forma limpia de hacer un suscribe, con next y error
onSubmit(){
if(this.editarForm.valid){

  this.prod.nombre = this.editarForm.value.nombre

  if(isNaN(this.prod.idProducto)){
    console.log("el id no es un numero en el SUBMIT")
  }

  this.servicio.editarProducto(this.prod.idProducto, this.editarForm.value).subscribe({
    next: (respuesta)=>{
      console.log("Respuesta de la API: " + respuesta)
      this.router.navigate(["lista"])
    }, 
    error: (error) =>{
      console.error("error en el SUBMIT", error) //añadir emergente de error  PENDIENTE
      console.error("Status:", error.status);
      console.error("Mensaje:", error.message);
      console.error("Detalles:", error.error);
   
    }
  })
}

}
  
}
