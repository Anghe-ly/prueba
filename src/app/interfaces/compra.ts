import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface Compra {
    id:number,
    fechaCompra: Date,
    usuario:Usuario,
    productos:Producto[],
    total:number
}
