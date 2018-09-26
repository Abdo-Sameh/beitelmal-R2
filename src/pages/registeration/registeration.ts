import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";

/**
 * Generated class for the RegisterationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registeration',
  templateUrl: 'registeration.html',
})
export class RegisterationPage {

  packages = []
  countries = []
  name
  email
  phone
  country_id
  member_type
  package_id
  password
  stock_type
  constructor(private toastCtrl: ToastController, public apiProvider: ApiProvider, public navCtrl: NavController,
    public navParams: NavParams, public menu: MenuController) {
    this.registerFormData();
    this.package_id = navParams.get('package');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationPage');
  }

  openMenu(){
    this.menu.open();
  }

  registerFormData() {
    this.apiProvider.registerFormData().subscribe(res => {
      console.log(res);
      if (res['status'] == 1) {
        this.packages = res['packages'];
        this.countries = res['countries'];
        console.log(this.packages);
        console.log(this.countries);
        // loading.dismiss();
      }
    });
  }

  register(name, email, phone, country_id, member_type, package_id, password, stock_type) {
    this.apiProvider.register(name, email, phone, country_id, member_type, package_id, password, stock_type).then((result) => {
      console.log(result);
      if (result['STATUS'] == 1) {

        let toast = this.toastCtrl.create({
          message: result['MESSAGE'],
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
        this.navCtrl.push(LoginPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });

      } else {
        let toast = this.toastCtrl.create({
          message: 'لإتمام التسجيل رجاء التأكد من صحة البيانات وعدم التسجيل بها من قبل',
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }

    })
  }

  loginPage() {
    this.navCtrl.push(LoginPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }

  homePage(){
    this.navCtrl.push(HomePage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }

}
