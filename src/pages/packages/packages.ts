import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterationPage } from '../registeration/registeration';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the PackagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html',
  providers: [NotificationsProvider]
})
export class PackagesPage {

  packages = []
  loggedIn = "0"
  subscriber = "0"
  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private _notificationService: NotificationsProvider, public menu: MenuController) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
    console.log(this.loggedIn);

    this.getPackages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagesPage');
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

  getPackages() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.package().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.packages = res['PACKAGES'];
        loading.dismiss();
      }else {
        loading.dismiss();
      }
    });
  }



  registerationPage(package_id) {
    this.navCtrl.push(RegisterationPage,{
      package: package_id
    }).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }

}
