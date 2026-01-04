import { Component } from '@angular/core';
import { ListaComponent } from '../lista/lista.component';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productos: Producto[] = [];

  
      constructor(
        private servicio: ProductoService,
        private router: Router, 
        
        
      ) {}
      
      ngOnInit():void {
        this.servicio.mostrarProductos().subscribe({
          next: (producto) => {
            this.productos = producto;
          }
        })
      }


        redirigirLista(){
        this.router.navigate(["lista"])}

        redirigirDetalles(idproducto:number){
          this.router.navigate(["producto", idproducto])
        }


}
