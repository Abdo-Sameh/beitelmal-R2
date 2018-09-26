import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { FcmProvider } from '../../providers/fcm/fcm';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [NotificationsProvider, FcmProvider]
})
export class LoginPage {

  email
  userData
  password
  timer = 0
  loggedIn = "0"
  subscriber = "0";
  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams,
    private fcm: FcmProvider, private _notificationService: NotificationsProvider, public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openMenu(){
    this.menu.open();
  }

  login() {
    console.log(this.email + " " + this.password);
    this.apiProvider.login(this.email, this.password).then((result) => {
      console.log(result);
      if (result['STATUS'] == 1) {
        this.getRemainingDays();
        this.userData = result['USER'];
        localStorage.setItem('loggedIn', "1");
        localStorage.setItem('id', JSON.stringify(this.userData['id']));
        localStorage.setItem('email', JSON.stringify(this.userData['email']));
        localStorage.setItem('name', JSON.stringify(this.userData['name']));
        localStorage.setItem('role', JSON.stringify(this.userData['role']));
        localStorage.setItem('phone', JSON.stringify(this.userData['phone']));
        localStorage.setItem('package', JSON.stringify(this.userData['package']));
        localStorage.setItem('subscriber', JSON.stringify(this.userData['subscriber']));
        this.fcm.getToken().then(token => {
          console.log(token)
          this._notificationService.addUserToken(this.userData['id'], token).subscribe((res) => {
            console.log(res)
          });
        });
        this.navCtrl.push(HomePage).then(() => {
          const index = this.navCtrl.getActive().index;
          console.log(this.navCtrl.getActive());
          this.navCtrl.remove(0, index);
        });
      }
    })
  }

  getRemainingDays() {
    console.log(JSON.parse(localStorage.getItem('email')));
    this.apiProvider.remainingDays(JSON.parse(localStorage.getItem('email'))).subscribe(data => {
      if(data['STATUS'] == 1)
      this.timer = data['TIMER'];
      console.log(data);
    });
  }

}
