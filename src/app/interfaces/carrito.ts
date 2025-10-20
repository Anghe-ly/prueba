import { ProductoCarrito } from "./producto-carrito";
import { Usuario } from "./usuario";

export interface Carrito {
    id: number;
    total: number;
    cantidadTotal: number;
    fechaCompra: Date;
    usuario: Usuario;
    productos: ProductoCarrito[];
}

