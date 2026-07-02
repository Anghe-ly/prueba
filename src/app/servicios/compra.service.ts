import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Compra } from '../interfaces/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

private URL:string = environment.apiUrl
private compraSubject = new BehaviorSubject<Compra[]>([]);

public compra$ = this.compraSubject.asObservable();


  constructor(

    private http : HttpClient, 
    private auth: AuthService
  ) { }

  //metodo que actualiza y llama al behavior subject
  cargarCompras(idUsuario:number){
    this.historialCompra(idUsuario).subscribe(
      comprasData => this.compraSubject.next(comprasData)
    );
  }

//CREAR COMPRA
crearCompra(idUsuario:number):Observable<any>{
  return this.http.post<any>(`${this.URL}/private/compra/${idUsuario}`, {})
}

//HISTORIAL DE COMPRS
historialCompra(idUsuario:number):Observable<any[]>{
  return this.http.get<any[]>(`${this.URL}/private/compra/historial/${idUsuario}`)
}

  //OBTENER DETALLES
  obtenerDetalles(idCompra:number):Observable<any>{
    return this.http.get<any>(`${this.URL}/private/compra/detalles/${idCompra}`)
  }

//ELIMINAR COMPRA
eliminarCompra(idCompra:number):Observable<any>{
    return this.http.delete<any>(`${this.URL}/private/compra/eliminar/${idCompra}`)
  }
}
