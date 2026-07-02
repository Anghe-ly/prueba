import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "../../componentes/menuProducto/menu.component";


@Component({
  selector: 'app-zona-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './zona-user.component.html',
  styleUrl: './zona-user.component.css'
})
export class ZonaUserComponent {

}
