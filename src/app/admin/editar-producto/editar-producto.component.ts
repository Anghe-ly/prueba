import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../servicios/producto.service';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

//añadir toast de alertas luego

producto: Producto = {
  nombre: "",
  idProducto: 0,
  precio: 0
}

constructor(

private servicio: ProductoService,
private authService: AuthService,
private ruta: ActivatedRoute,
private router: Router,


){}




//formulario editar
editarForm: FormGroup = new FormGroup({
  nombre: new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]),
  precio: new FormControl("",[
    Validators.required
  ])
})


//metodos envio y carga de datos
ngOnInit(): void {

  this.ruta.params.subscribe(params=>{
    this.producto.idProducto = params["id"]

    if(isNaN(this.producto.idProducto) || this.producto.idProducto <= 0){
      console.log("el ID no es un numero valido" + params["id"])

    }

    this.obtenerProducto(this.producto.idProducto)
  })
}


obtenerProducto(id:number):void{
this.servicio.obtenerPorID(id).subscribe({
  next: (producto)=>{
    this.editarForm.patchValue(producto)
  },
  error: (error)=>{
    console.log("error al cargar el producto")
  }
})

}

onSubmit(){
  if(this.editarForm.valid){
   
   

    this.servicio.editarProducto(this.producto.idProducto, this.editarForm.value).subscribe({
      next: ()=>{
        console.log("producto editado")
        this.servicio.cargarProductos();
      },
      error: (error)=>{
        console.log("error al editar el producto ", error)
      }
    })
  }

  this.router.navigate(["/admin"])
}

cerrarFormEditar(){
  this.router.navigate(["/admin"])

}


}
