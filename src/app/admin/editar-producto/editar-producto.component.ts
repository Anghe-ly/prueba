import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../servicios/producto.service';
import { AuthService } from '../../servicios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

//variables para el toast 
toastVisible: boolean = false;
toastMensaje: string = "";
toastClase: string = 'bg-success';

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
    this.mostrarToast("Error al cargar el producto", "danger")
  }
})

}

onSubmit(){
  if(this.editarForm.valid){
   
   

    this.servicio.editarProducto(this.producto.idProducto, this.editarForm.value).subscribe({
      next: ()=>{
        this.mostrarToast("Producto editado con éxito", "success");
        this.servicio.cargarProductos();
      },
      error: (error)=>{
        this.mostrarToast("Error al editar el producto", "danger")
      }
    })
  }

  setTimeout(() => {
      this.router.navigate(["/admin"])
  }, 1500);
}

cerrarFormEditar(){
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
