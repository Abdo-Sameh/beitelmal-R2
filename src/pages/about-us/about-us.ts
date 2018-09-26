import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
  providers: [NotificationsProvider]
})
export class AboutUsPage {
  aboutText
  loggedIn = "0"
  subscriber = "0"
  constructor(public loadingCtrl: LoadingController, public apiProvider: ApiProvider,
    public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
    private _notificationService: NotificationsProvider) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    loading.present();
    this.apiProvider.about().subscribe(data => {
      this.aboutText = data['ABOUT'][0].description;
      console.log(data);
      loading.dismiss();
    });

  }

  openMenu() {
    this.getRemainingDays();
    this.menu.open();
  }

  getRemainingDays() {
    this.apiProvider.remainingDays(JSON.parse(localStorage.getItem('email'))).subscribe(data => {
      if(data['STATUS'] == 1)
      // timer = data['TIMER'];
      console.log(data);
    });
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

}
