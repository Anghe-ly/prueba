import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CompraService } from '../../servicios/compra.service';
import { Compra } from '../../interfaces/compra';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {

//variable de compras

listaCompra: Compra[] = [];


constructor(

private compraService: CompraService,
private authService: AuthService

) {}

ngOnInit():void{
  
if(this.authService.logueado()){
  const idUsuario = this.authService.getUsuarioId();
  if(idUsuario){
    this.compraService.cargarCompras(idUsuario);
  }
}  

this.compraService.compra$.subscribe({
  next:(comprasData)=>{
    this.listaCompra = comprasData
  },
  error:(error)=>{
    console.log("error al obtener la compra", error)
  }
})

}//fin del onInit

eliminarCompra(idCompra:number){

this.compraService.eliminarCompra(idCompra).subscribe({
  next:()=>{
    const idUsuario = this.authService.getUsuarioId()
    this.compraService.cargarCompras(idUsuario!)
  },
  error:()=>{
    console.log("no se ha podido eliminar la compra")
  }
})
}



}
