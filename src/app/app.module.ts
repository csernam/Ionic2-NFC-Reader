import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NfcDataComponent } from './../pages/nfc-data/nfc-data.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NfcDataComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NfcDataComponent
  ],
  providers: []
})
export class AppModule {}
