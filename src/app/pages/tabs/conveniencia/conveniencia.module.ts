import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvenienciaPageRoutingModule } from './conveniencia-routing.module';

import { ConvenienciaPage } from './conveniencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvenienciaPageRoutingModule
  ],
  declarations: [ConvenienciaPage]
})
export class ConvenienciaPageModule {}
