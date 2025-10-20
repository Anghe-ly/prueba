import { Producto } from "./producto";

export interface ProductoCarrito extends Producto {
    cantidad: number, 
    preciototal: number,
    precioUnidad: number
}
