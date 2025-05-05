import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(
    private router: Router
  ){
  }

  redirigirProducto(){
  this.router.navigate(["./producto"])
}

redirigirLista(){
  this.router.navigate(["./lista"])
}

}
