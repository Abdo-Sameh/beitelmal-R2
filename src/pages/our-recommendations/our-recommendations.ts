import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';


/**
 * Generated class for the OurRecommendationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-our-recommendations',
  templateUrl: 'our-recommendations.html',
  providers: [NotificationsProvider]
})

export class OurRecommendationsPage {
  recentOurRecommendations = []
  loggedIn = "0";
  subscriber = "0";
  selectOptions
  sectors = []
  rec_type = ""
  stock_type_id = ""
  sector_id = ""

  constructor(public loadingCtrl: LoadingController, public apiProvider: ApiProvider, public navCtrl: NavController,
    public navParams: NavParams, private _notificationService: NotificationsProvider, public menu: MenuController) {
    // this.ourRecommendations();
    this.getAllSectors();
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OurRecommendationsPage');
    this.selectOptions = {
      // title: 'Pizza Toppings',
      // subTitle: 'Select your toppings',
      cancelText: 'الغاء',
      okText: 'موافق'
    };
  }

  openMenu(){
    this.menu.open();
  }

  getAllSectors(){
    this.apiProvider.sectors().subscribe(res => {
      console.log(res);
      this.sectors = res['SECTORS'];
    })
  }

  ourRecommendations() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();//recommendations(id, rec_type, stock_type_id, sector_id)
    console.log(localStorage.getItem('id'), this.rec_type, this.stock_type_id, this.sector_id);
    this.apiProvider.recommendations(localStorage.getItem('id'), this.rec_type, this.stock_type_id, this.sector_id).subscribe(res => {
      // console.log(res);
      if (res['STATUS'] == 1) {
        // console.log(res);
        this.recentOurRecommendations = res['RECOMMENDATIONS']['data'];
        console.log(this.recentOurRecommendations);
        loading.dismiss();
      }
    })
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
