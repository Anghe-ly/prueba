import { Component } from '@angular/core';
import { MenuComponent } from "../../componentes/menuProducto/menu.component";
import { FooterComponent } from "../../componentes/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MenuComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
