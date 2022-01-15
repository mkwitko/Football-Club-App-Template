import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonRouterOutlet } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Plugins
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
  [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers:
  [
    {
      provide:
      RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    ScreenOrientation
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
