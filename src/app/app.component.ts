import { ChangePageService } from './services/navigation/change-page.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { MenuService } from './services/menu-control/menu.service';
import { ScreenService } from './services/screen-effects/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public itens = [
    {
      nome: 'Home',
      icone: 'home-outline',
      url: 'tabs/tabs/home',
      disabled: 'false',
      who: 'all'
    },
    {
      nome: 'Campeonatos',
      icone: 'football-outline',
      url: '/tabela',
      disabled: 'false',
      who: 'all'
    },
    {
      nome: 'Calendário',
      icone: 'calendar-outline',
      url: '/calendario',
      disabled: 'false',
      who: 'all'
    },
    {
      nome: 'Multimidia',
      icone: 'easel-outline',
      url: '/multimidia',
      disabled: 'false',
      badge: true,
      who: 'all'
    },
    {
      nome: 'Interatividade',
      icone: 'megaphone-outline',
      url: '/interatividade',
      disabled: 'true',
      who: 'all'
    },
    {
      nome: 'Clube',
      icone: 'shield-half-outline',
      url: '/clube',
      disabled: 'false',
      who: 'all'
    },
    {
      nome: 'Admin',
      icone: 'key-outline',
      url: '/admin',
      disabled: 'false',
      who: 'admin'
    }
  ];

  constructor(
    private changePage: ChangePageService,
    private auth: AuthService,
    private menu: MenuService,
    private screen: ScreenService
  ) {}

  goTo(url){
    this.changePage.changePage(url);
  }

  async logout(){
    try {
     await this.screen.presentLoading();
     if(await (await this.auth.getAuth().currentUser).isAnonymous){
      (await this.auth.getAuth().currentUser).delete();
    }
     this.menu.onOff(false);
     await this.auth.logout();
     this.screen.loading.dismiss();
    } catch (error){
      this.screen.presentToast(error.message);
    }
  }

}
