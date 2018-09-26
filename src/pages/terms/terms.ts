import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  terms = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
    public loadingCtrl: LoadingController, public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    loading.present();
    this.apiProvider.terms().subscribe(data => {
      if(data['STATUS'] == 1)
      this.terms = data['TERMS'];
      console.log(data);
      loading.dismiss();
    });
  }

  openMenu(){
    this.menu.open();
  }

}
