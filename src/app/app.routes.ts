import { Routes } from '@angular/router';
import { MenuComponent } from './componentes/menuProducto/menu.component';
import { Component } from '@angular/core';
import { ListaComponent } from './componentes/lista/lista.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [

    {path: "home",
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
        path: "editar/:id",
        component: EditarProductoComponent
       },
       {
        path: "registro",
        component: UsuarioComponent
       }, 
       {
        path: "inicio-sesion",
        component: InicioSesionComponent
       }
       
       
       /* loadComponent: ()=>
            import('./servicios/http.service').then((c)=> c.HttpService)*/
   
];
