import { AdicionarUsuarioDbService } from './../../../services/authentication/adicionar-usuario-db.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ScreenService } from 'src/app/services/screen-effects/screen.service';
import { ErrosService } from 'src/app/services/traducoes/erros.service';


@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  public email;
  public confirmar = false;

  constructor(private router: Router,
    private auth: AuthService,
    private screen: ScreenService,
    private trad: ErrosService,
    private userManage: AdicionarUsuarioDbService
    ) { }

  ngOnInit() {
  }

  change2(event){
    this.confirmar = event.detail.checked;
  }

  async enviar(email){
    const podePassar =  this.canPass();
    console.log(podePassar);
    if(podePassar){
      const emailExistente = [];
      this.userManage.getClientes().subscribe(res => {
        for(const a of res){
          emailExistente.push(a.user);
        }
        if(emailExistente.includes(email)){
          try {
            this.auth.resetPassword(email);
          }
            catch(error){
              console.log(error);
              const message = this.trad.verifyErrors(error.code);
              this.screen.presentToast(message);
            } finally {
              this.rota('login');
            }
        } else {
          this.screen.presentToast('Este e-mail não consta na base de dados');
        }
      });
    }
  }

  canPass(){
    if(!this.email){
      this.screen.presentToast('Preencha seu e-mail');
      return false;
    }
    else if(!this.confirmar){
      this.screen.presentToast('Confirme seu e-mail');
      return false;
    }
    return true;
  }

  rota(rota: string){
    this.router.navigateByUrl(rota);
  }

}
