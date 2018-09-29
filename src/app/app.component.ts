import { Component } from '@angular/core';
import { Nav, Platform, AlertController, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { PackagesPage } from '../pages/packages/packages';
import { ServicesPage } from '../pages/services/services';
import { TermsPage } from '../pages/terms/terms';
import { PolicyPage } from '../pages/policy/policy';
import { ResponsPage } from '../pages/respons/respons';
import { LongRecommendationsPage } from '../pages/long-recommendations/long-recommendations';
import { ShortRecommendationsPage } from '../pages/short-recommendations/short-recommendations';
import { OurRecommendationsPage } from '../pages/our-recommendations/our-recommendations';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { ReportsPage } from '../pages/reports/reports';
import { tap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FcmProvider } from '../providers/fcm/fcm';
import { ApiProvider } from '../providers/api/api';

@Component({
  templateUrl: 'app.html',
  providers: [NotificationsProvider, FcmProvider]
})
export class MyApp {
  rootPage: any = HomePage;

  public counter = 0;
  public timer = 0
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any, login: boolean }>;

  constructor(public http: Http, platform: Platform, public apiProvider: ApiProvider,
    private _notificationService: NotificationsProvider, statusBar: StatusBar, splashScreen: SplashScreen,
    private push: Push, public alertCtrl: AlertController, private fcm: FcmProvider, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.getRemainingDays();
      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
    });
    this.pages = [
      { title: 'الرئيسية', component: HomePage, login: false },
      { title: 'من نحن', component: AboutUsPage, login: false },
      { title: 'الباقات', component: PackagesPage, login: false },
      { title: 'الخدمات', component: ServicesPage, login: false },
      { title: 'توصياتنا', component: OurRecommendationsPage, login: true },
      { title: 'تقارير', component: ReportsPage, login: true },
      { title: 'توصيات مضاربية', component: LongRecommendationsPage, login: false },
      { title: 'توصيات قصيرة المدى', component: ShortRecommendationsPage, login: true },
      { title: 'توصيات استثمارية', component: RecommendationsPage, login: false },
      { title: 'الشروط والأحكام', component: TermsPage, login: false },
      { title: 'سياسة الموقع', component: PolicyPage, login: false },
      { title: 'إخلاء المسؤلية', component: ResponsPage, login: false },
      { title: 'اتصل بنا', component: ContactUsPage, login: false },
      { title: 'تسجيل الخروج', component: HomePage, login: true },
    ];
  }

  getLoggedIn() {
    return localStorage.getItem('loggedIn');
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "اضغط مرة أخري للخروج",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  openPage(page) {
    if (page.title == "تسجيل الخروج") {
      this.logout();
    }
    if (page.title == "توصياتنا") {

    }
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    this.nav.setRoot(HomePage);
    if (localStorage.getItem('loggedIn') == null)
      localStorage.setItem('loggedIn', "0");
  }

  logout() {
    this._notificationService.deleteUserToken(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
    });
    this.timer = 0;
    localStorage.clear();
    localStorage.setItem('loggedIn', '0');
    localStorage.setItem('subscriber', '0');
    this.nav.setRoot(HomePage);
  }

  getRemainingDays() {
    this.apiProvider.remainingDays(JSON.parse(localStorage.getItem('email'))).subscribe(data => {
      if(data['STATUS'] == 1)
      this.timer = data['TIMER'];
      console.log(data);
    });
  }

  initPushNotification() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          //alert('We have permission to send push notifications');
        } else {
          //  alert('We don\'t have permission to send push notifications');
        }
      });

    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: '452821725792',
        sound: true,
        vibrate: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      //alert('Received a notification: ' + notification);
      //Notification Display Section
      let confirmAlert = this.alertCtrl.create({
        title: 'New Notification',
        message: JSON.stringify(notification),
        buttons: [{
          text: 'Ignore',
          role: 'cancel'
        }, {
          text: 'View',
          handler: () => {
            //TODO: Your logic here
            //self.nav.push(DetailsPage, {message: data.message});
            //alert("hi");
          }
        }]
      });
      confirmAlert.present();
      //
    });
    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      //alert(JSON.stringify(registration));
      this.saveDeviceToken(registration.registrationId);
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  saveDeviceToken(t) {
    this.http.get('http://beitelmal.com/api/v1/auth/saveToken?id=' + t)
      .map(res => res.json())
      .subscribe(
        data => {
          //alert(JSON.stringify(data));
        },
        err => {
          //alert("Oops!");
        }
      );
  }
}
