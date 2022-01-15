import { ScreenOrientationService } from './../../../services/screen-effects/screen-orientation.service';
import { ChangePageService } from './../../../services/navigation/change-page.service';
import { MenuService } from './../../../services/menu-control/menu.service';
import { ScreenService } from './../../../services/screen-effects/screen.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { AdicionarUsuarioDbService } from 'src/app/services/authentication/adicionar-usuario-db.service';
import { ErrosService } from 'src/app/services/traducoes/erros.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  /* Autenticação */
  public userLogin: Usuario = {};
  public userRegister: Usuario = {};
  public userRegisterFinal: Usuario = {};
  public confirmacaoSenha: string;

  /* Legal Issues */
  public termos = false;
  public privacidade = false;


  constructor(
    private screen: ScreenService,
    private auth: AuthService,
    private menu: MenuService,
    private changePage: ChangePageService,
    private adicionar: AdicionarUsuarioDbService,
    private orientation: ScreenOrientationService,
    private trad: ErrosService
  ) { }

  ngOnInit() {
    this.orientation.unlock();
    this.menu.onOff(false);
  }

  ionViewDidEnter(){
    this.slides.getActiveIndex().then(res => {
      const slideIndex = res;
      if(slideIndex === 1){
        this.slides.slidePrev();
      }
    });
  }

  /* Login */
  async login(){

    await this.screen.presentLoading();

    try {
      this.auth.login(this.userLogin).then(cred => {
        //this.menu.onOff(true);
      });
      this.screen.loading.dismiss();

    } catch(error){
      const message = await this.trad.verifyErrors(error.code);
      this.screen.presentToast(message);

    } finally {
      this.screen.loading.dismiss();
    }
  }

  async loginGuest(){
    await this.screen.presentLoading();
    try {
      await this.auth.loginGuest().then(cred => {
        this.menu.onOff(true);
      });
      this.screen.loading.dismiss();
    } catch (error){
      const message = await this.trad.verifyErrors(error.code);
      this.screen.presentToast(message);
    } finally {
      this.screen.loading.dismiss();
    }
  }

  /* Registro */

  async register(){
    const canPass = this.registerCanPass();
    if(canPass){
      await this.screen.presentLoading();
      try {
        this.createUser();
        await this.screen.loading.dismiss();
      }
      catch(error)
      {
        const message = await this.trad.verifyErrors(error.code);
        this.screen.presentToast(message);
      } finally {
        await this.screen.loading.dismiss();
      }
    }
  }

  registerCanPass(){
    if(this.termos === false ||
      this.privacidade === false)
      {
        this.screen.presentToast('Leia e aceite os termos de Licença de Uso e Politica de Privacidade de Dados');
        return false;
      }
   else {
     if(!this.userRegister.nome ||
       !this.userRegister.user ||
       !this.userRegister.password){
         this.screen.presentToast('Preencha os seus dados');
         return false;
       } else {
         if(this.userRegister.password !== this.confirmacaoSenha){
           this.screen.presentToast('Senhas inseridas não são identicas');
           return false;
         }
       }
   }
   return true;
  }

  async createUser(){
    await this.setDataToRegisteredUser();
    await this.auth.register(this.userRegisterFinal).then(cred => {
      this.adicionar.addCliente(this.userRegisterFinal, cred.user.uid);
    });
    await this.resetRegisteredUser();
  }

  setDataToRegisteredUser(){
    this.userRegister.createdAt = new Date().getTime();
    this.userRegister.who = 'usuario';
    this.userRegisterFinal = this.userRegister;
  }

  resetRegisteredUser(){
    this.userRegister.user = null;
    this.userRegister.password = null;
    this.userRegister.nome = null;
    this.confirmacaoSenha = null;
    this.privacidade = false;
    this.termos = false;
  }

  /* Legal issue */

  async changeTermos(event){
    this.termos = event.detail.checked;
  }

  async changePrivacidade(event){
    this.privacidade = event.detail.checked;
  }

  /* Navigation */

  goTo(a: string){
    if(a === 'next'){
      this.slides.slideNext();
    } else {
      this.slides.slidePrev();
    }
  }

  change(url){
    this.changePage.changePage(url);
  }

}
