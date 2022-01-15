import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
    , canActivate: [LoginGuard]
  },
  {
    path: 'esqueci-senha',
    loadChildren: () => import('./pages/auth/esqueci-senha/esqueci-senha.module').then( m => m.EsqueciSenhaPageModule)
    , canActivate: [LoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs/tabs.module').then( m => m.TabsPageModule)
    , canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
