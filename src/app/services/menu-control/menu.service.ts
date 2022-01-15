import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private menu: MenuController) { }

  onOff(bool: boolean){
    this.menu.enable(bool);
  }
}
