import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvenienciaPage } from './conveniencia.page';

const routes: Routes = [
  {
    path: '',
    component: ConvenienciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvenienciaPageRoutingModule {}
