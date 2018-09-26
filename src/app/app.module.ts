
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { PackagesPage } from '../pages/packages/packages';
import { ServicesPage } from '../pages/services/services';
import { LongRecommendationsPage } from '../pages/long-recommendations/long-recommendations';
import { ShortRecommendationsPage } from '../pages/short-recommendations/short-recommendations';
import { OurRecommendationsPage } from '../pages/our-recommendations/our-recommendations';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { ReportsPage } from '../pages/reports/reports';
import { RegisterationPage } from '../pages/registeration/registeration';
import { LoginPage } from '../pages/login/login';
import { TermsPage } from '../pages/terms/terms';
import { PolicyPage } from '../pages/policy/policy';
import { ResponsPage } from '../pages/respons/respons';
import { ApiProvider } from '../providers/api/api';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { Firebase } from '@ionic-native/firebase';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FcmProvider} from '../providers/fcm/fcm';

var firebase = {
  apiKey: "AIzaSyA3c35y6ub6yinAtudtzj1jLgWVUTCKqcE",
    authDomain: "beitelmal-9a894.firebaseapp.com",
    databaseURL: "https://beitelmal-9a894.firebaseio.com",
    projectId: "beitelmal-9a894",
    storageBucket: "",
    messagingSenderId: "763611652195"
  }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutUsPage,
    ContactUsPage,
    PackagesPage,
    ServicesPage,
    LongRecommendationsPage,
    RecommendationsPage,
    ReportsPage,
    RegisterationPage,
    LoginPage,
    ResponsPage,
    TermsPage,
    PolicyPage,
    ShortRecommendationsPage,
    OurRecommendationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutUsPage,
    ContactUsPage,
    PackagesPage,
    ServicesPage,
    LongRecommendationsPage,
    RecommendationsPage,
    ReportsPage,
    LoginPage,
    ResponsPage,
    TermsPage,
    PolicyPage,
    RegisterationPage,
    ShortRecommendationsPage,
    OurRecommendationsPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    NotificationsProvider,
    Firebase,
    FcmProvider,
  ]
})
export class AppModule {}
