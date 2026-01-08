import { Routes } from '@angular/router';
import { MenuComponent } from './componentes/menuProducto/menu.component';
import { Component } from '@angular/core';
import { ListaComponent } from './componentes/lista/lista.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuards } from './auth/auth.guard';
import { ProductoDetallesComponent } from './componentes/producto/producto-detalles/producto-detalles.component';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [

 { path:"",
    component: MainComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
       { path: "lista",
    component: ListaComponent,
       },
        {
        path: "producto",
        component: ProductoComponent
       },
         {
        path: "producto/:id",
        component: ProductoDetallesComponent
      },
       {
        path: "editar/:id",
        component: EditarProductoComponent,
        canActivate: [AuthGuards]
       },
       {
        path: "inicio-sesion",
        component: InicioSesionComponent
       },
       {
        path: "carrito",
        loadComponent: () => import('./componentes/carrito/carrito.component').then(c => c.CarritoComponent),
         canActivate: [AuthGuards]
       }

    ]

  }
   
];
