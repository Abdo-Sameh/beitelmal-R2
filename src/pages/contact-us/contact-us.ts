import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  providers: [NotificationsProvider]
})
export class ContactUsPage {

  info = {
    'address': '',
    'work_time': '',
    'email': '',
    'mobile': '',
    'phone': ''
  }
  loggedIn = "0"
  subscriber = "0";
  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private _notificationService: NotificationsProvider, public menu: MenuController) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
    this.contactInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
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

  contactInfo() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.contactInfo().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.info.address = res['CONTACTINFO'][0].address;
        this.info.email = res['CONTACTINFO'][0].email;
        this.info.mobile = res['CONTACTINFO'][0].mobile;
        this.info.phone = res['CONTACTINFO'][0].phone;
        this.info.work_time = res['CONTACTINFO'][0].work_time;
        loading.dismiss();
      }
    });
  }


}
