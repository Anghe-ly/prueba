import { Component } from '@angular/core';
import { ListaComponent } from '../lista/lista.component';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';

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
        
      ) {}
      
      ngOnInit():void {
        this.servicio.mostrarProductos().subscribe({
          next: (producto) => {
            this.productos = producto;
          }
        })
      }


}
