import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
  providers: [NotificationsProvider]
})
export class ServicesPage {

  loggedIn = "0"
  subscriber = "0"
  services = []
  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private _notificationService: NotificationsProvider, public menu: MenuController) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
    this.getServices();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  openMenu(){
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

  getServices() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.services().subscribe(res => {
      console.log(res);
      this.services = res['SERVICES'];
      loading.dismiss();
    });
  }

}
