import { Component } from '@angular/core';
import { App, NavController, LoadingController, MenuController } from 'ionic-angular';
import { PackagesPage } from '../packages/packages';
import { LoginPage } from '../login/login';
import { ReportsPage } from '../reports/reports';
import { RecommendationsPage } from '../recommendations/recommendations';
import { OurRecommendationsPage } from '../our-recommendations/our-recommendations';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { FcmProvider } from '../../providers/fcm/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NotificationsProvider, FcmProvider]
})
export class HomePage {
  aboutText
  email
  password
  userData
  loggedIn = "0"
  package
  subscriber = "0";
  recentPublicRecommendations = []
  recentReports = []
  recentOurRecommendations = []
  constructor(public app: App, public navCtrl: NavController,
    public apiProvider: ApiProvider, public menu: MenuController,
    public loadingCtrl: LoadingController,
    private fcm: FcmProvider,
    private _notificationService: NotificationsProvider) {
    this.publicRecommendations();
    this.menu.enable(true);
    this.reports();

    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = JSON.parse(localStorage.getItem('subscriber'));
    this.package = JSON.parse(localStorage.getItem('package'));
    console.log(this.package);
    this.ourRecommendations();
  }

  openMenu() {
    this.menu.open();
  }

  logout() {
    this._notificationService.deleteUserToken(localStorage.getItem('id')).subscribe((res) => {
      console.log(res)
    });
    localStorage.clear();
    localStorage.setItem('loggedIn', '0');
    localStorage.setItem('subscriber', '0');
    this.navCtrl.push(HomePage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }

  publicRecommendations() {
    this.apiProvider.uploads().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.recentPublicRecommendations = res['UPLOADS'].slice(0, 3);
        console.log(this.recentPublicRecommendations);
      }
    })
  }

  reports() {
    this.apiProvider.reports().subscribe(res => {
      if (res['STATUS'] == 1) {
        this.recentReports = res['REPORTS']['data'].slice(0, 3);
        console.log(this.recentReports);
      }
    });
  }

  ourRecommendations() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    if (this.package == '11') {
      this.apiProvider.recommendations(localStorage.getItem('id'), "", "", "").subscribe(res => {
        console.log(res);
        if (res['STATUS'] == 1 && res['RECOMMENDATIONS'] != []) {
          console.log(res);
          if (res['RECOMMENDATIONS']['data'].slice(0, 1)[0])
            this.recentOurRecommendations = res['RECOMMENDATIONS']['data'].slice(0, 3);
          console.log(this.recentOurRecommendations);
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      })
    }
    else {
      this.apiProvider.recommendations(localStorage.getItem('id'), 0, "", "").subscribe(res => {
        console.log(res);
        if (res['STATUS'] == 1 && res['RECOMMENDATIONS'] != []) {
          console.log(res);
          if (res['RECOMMENDATIONS']['data'].slice(0, 1)[0])
            this.recentOurRecommendations = res['RECOMMENDATIONS']['data'].slice(0, 1);
          console.log(this.recentOurRecommendations);
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      })

      this.apiProvider.recommendations(localStorage.getItem('id'), 1, "", "").subscribe(res => {
        console.log(res);
        if (res['STATUS'] == 1 && res['RECOMMENDATIONS'] != []) {
          console.log(res);
          if (res['RECOMMENDATIONS']['data'].slice(0, 1)[0])
            this.recentOurRecommendations.push(res['RECOMMENDATIONS']['data'].slice(0, 1)[0]);
          console.log(this.recentOurRecommendations);
        }
      })

      this.apiProvider.recommendations(localStorage.getItem('id'), 2, "", "").subscribe(res => {
        console.log(res);
        if (res['STATUS'] == 1 && res['RECOMMENDATIONS'] != []) {
          console.log(res);
          if (res['RECOMMENDATIONS']['data'].slice(0, 1)[0])
            this.recentOurRecommendations.push(res['RECOMMENDATIONS']['data'].slice(0, 1)[0]);
          console.log(this.recentOurRecommendations);
        }
      })
    }
  }

  ourRecommendationsPage() {
    this.navCtrl.push(OurRecommendationsPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

  loginPage() {
    this.navCtrl.push(LoginPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

  homePage() {
    this.navCtrl.push(HomePage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

  reportsPage() {
    this.navCtrl.push(ReportsPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

  recommendationsPage() {
    this.navCtrl.push(RecommendationsPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

  packagesPage() {
    this.navCtrl.push(PackagesPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

}
