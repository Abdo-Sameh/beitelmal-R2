import { Component } from '@angular/core';
import { App, NavController, LoadingController, MenuController } from 'ionic-angular';
import { PackagesPage } from '../packages/packages';
import { LoginPage } from '../login/login';
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
    this.ourRecommendations();
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
    $('.menu-icon').removeClass('is-clicked');
    $('.header').removeClass('menu-is-open');
    $('.main-nav').children('ul').removeClass('is-visible');
    $('.primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      $('body').removeClass('overflow-hidden');
    });
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
    this.apiProvider.recommendations(localStorage.getItem('id')).subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        console.log(res);
        this.recentOurRecommendations = res['RECOMMENDATIONS']['data'].slice(0, 3);
        console.log(this.recentOurRecommendations);
        loading.dismiss();
      } else {
        loading.dismiss();
      }
    })
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

  packagesPage(){
    this.navCtrl.push(PackagesPage).then(() => {
      const index = this.navCtrl.getActive().index;
      console.log(this.navCtrl.getActive());
      this.navCtrl.remove(0, index);
    });
  }

}
