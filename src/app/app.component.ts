import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaComponent } from './componentes/lista/lista.component';
import { MenuComponent } from './componentes/menuProducto/menu.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, ListaComponent, ProductoComponent, EditarProductoComponent, UsuarioComponent, InicioSesionComponent, CarritoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFM';
}
