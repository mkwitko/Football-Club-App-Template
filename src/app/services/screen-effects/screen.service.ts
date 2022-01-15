import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  public loading;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    await this.loading.present();
  }

  public async presentToast(message: string, drt?: number) {
    let durationMessage = 3000;
    if(drt){
      durationMessage = drt;
    }
    const toast = await this.toastController.create({
      message,
      duration: durationMessage
    });
    toast.present();
  }
}
