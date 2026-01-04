import { Producto } from "./producto";

export interface ProductoCarrito {
    id:number,
    carritoId:number,
    cantidad:number,
    precioTotal:number,
    producto?:  {
        idProducto:number,
        nombre:string,
        precio:number
    }

}
