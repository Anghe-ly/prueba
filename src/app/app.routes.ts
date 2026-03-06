import { Routes } from '@angular/router';
import { MenuComponent } from './componentes/menuProducto/menu.component';
import { Component } from '@angular/core';
import { ListaComponent } from './componentes/lista/lista.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuards } from './auth/auth.guard';
import { ProductoDetallesComponent } from './componentes/producto-detalles/producto-detalles.component';
import { MainComponent } from './layout/main/main.component';
import { AdminGuard } from './auth/admin-guard.guard';
import { ZonaAdminComponent } from './admin/zona-admin/zona-admin.component';
import { ListaAdminComponent } from './admin/lista-admin/lista-admin.component';

export const routes: Routes = [


  {
  path: 'admin',
  canActivate: [AdminGuard],
  loadComponent: () =>
    import('./admin/zona-admin/zona-admin.component')
      .then(c => c.ZonaAdminComponent),
      children:[
        {
        path: "",
        loadComponent: ()=> import('./admin/lista-admin/lista-admin.component').then(c => c.ListaAdminComponent),
        canActivate: [AuthGuards]
        },
        {
        path: "editar/:id",
        loadComponent: ()=> import('./admin/editar-producto/editar-producto.component').then(c => c.EditarProductoComponent),
        canActivate: [AuthGuards]
        },
        {
          path: "crear",
          loadComponent: () => import('./admin/crear-producto/crear-producto.component').then(c => c.CrearProductoComponent),
          canActivate: [AuthGuards]
        }
      ]
},

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
        path: "producto/:id",
        component: ProductoDetallesComponent
      },
      
       {
        path: "inicio-sesion",
        component: InicioSesionComponent
       },
       {
        path: "carrito",
        loadComponent: () => import('./componentes/carrito/carrito.component').then(c => c.CarritoComponent),
         canActivate: [AuthGuards]
       },
    

    ]

  }

   
];
