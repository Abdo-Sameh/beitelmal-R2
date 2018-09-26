import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the ShortRecommendationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-short-recommendations',
  templateUrl: 'short-recommendations.html',
  providers: [NotificationsProvider]
})
export class ShortRecommendationsPage {

  loggedIn = "0"
  subscriber = "0"
  recommendations = []
  results = {
    'recommendations_all': '',
    'recommendations_win': '',
    'recommendations_lose': '',
    'average_profit': '',
    'recommendations_open': ''
  }
  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private _notificationService: NotificationsProvider, public menu: MenuController) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
    this.getShortRecommendations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShortRecommendationsPage');
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

  getShortRecommendations() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.shortRecommendations().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.recommendations = res['DATA']['recommendations'];
        this.results.average_profit = res['DATA'].average_profit;
        this.results.recommendations_all = res['DATA'].recommendations_all;
        this.results.recommendations_win = res['DATA'].recommendations_win;
        this.results.recommendations_lose = res['DATA'].recommendations_lose;
        this.results.recommendations_open = res['DATA'].recommendations_open;
        loading.dismiss();
      }
    });
  }

}
