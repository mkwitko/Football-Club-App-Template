import { MenuService } from './../../../services/menu-control/menu.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private menu: MenuService
  ) { }

  ionViewWillEnter() {
    this.menu.onOff(true);
  }

}
