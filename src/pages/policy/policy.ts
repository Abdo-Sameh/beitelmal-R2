import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the PolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {

  policies = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,
    public menu: MenuController, public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyPage');
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    loading.present();
    this.apiProvider.policy().subscribe(data => {
      if(data['STATUS'] == 1)
      this.policies = data['POLICY'];
      console.log(data);
      loading.dismiss();
    });
  }

  openMenu(){
    this.menu.open();
  }

}
