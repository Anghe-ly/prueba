import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(
    private router: Router, 
    public usuarioService: UsuarioService
  ){
  }

  redirigirProducto(){
  this.router.navigate(["./producto"])
}

redirigirLista(){
  this.router.navigate(["./lista"])
}


  cerrarSesion() {
    this.usuarioService.logeado = false;
    // Aquí puedes limpiar tokens, etc.
    this.router.navigate(['/inicio-sesion']);
  }

}
