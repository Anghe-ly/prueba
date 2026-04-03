import { Component } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import { AuthService } from '../../servicios/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-lista-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lista-admin.component.html',
  styleUrl: './lista-admin.component.css'
})
export class ListaAdminComponent {


  
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
   
    ) {}
  
    ngOnInit(): void {

      this.servicioProducto.productos$.subscribe(
        productos=> this.listaProducto = productos
      )

      this.servicioProducto.cargarProductos();

    }
  
    eliminarProducto(id: number) {
       this.servicioProducto.borrarProducto(id).subscribe(datos=> {
        this.servicioProducto.cargarProductos();
        this.router.navigate(["/admin"])
      })
    }

  
    redirigirDetalles(id:number){
      this.router.navigate(["producto", this.producto.idProducto])
    }
  
      redirigirEditar(id:number){
      this.router.navigate(["/admin/editar",id])
    }
  
    redirigirCrear(){
      this.router.navigate(["/admin/crear"])
    }
}
