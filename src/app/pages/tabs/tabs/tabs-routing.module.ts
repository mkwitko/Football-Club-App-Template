/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'noticia',
        children: [
          {
            path: '',
            loadChildren: () => import('./../noticias/noticias.module').then( m => m.NoticiasPageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'conveniencia',
        children: [
          {
            path: '',
            loadChildren: () => import('./../conveniencia/conveniencia.module').then( m => m.ConvenienciaPageModule), canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () => import('./../perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AuthGuard]
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
