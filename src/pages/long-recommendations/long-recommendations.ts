import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the LongRecommendationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-long-recommendations',
  templateUrl: 'long-recommendations.html',
  providers: [NotificationsProvider]
})
export class LongRecommendationsPage {
  loggedIn = "0";
  subscriber = "0";
  year = "0"
  month = "0";
  years = []
  data = {
    "monthName": "",
    "days1": 0,
    "days2": 0,
    "days3": 0,
    "recommendations_lose": 0,
    "average_profit": 0,
    "average_profit_per_unit": 0,
    "win_rate": 0,
    "lose_rate": 0
  }
  months = []
  longRecom = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider,
    private _notificationService: NotificationsProvider, public menu: MenuController) {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LongRecommendationsPage');
    this.longRecommendations();
    // this.longRecommendationsDay();
    // this.longRecommendationsMonth();
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

  longRecommendations() {
    this.month = "0";
    this.apiProvider.longRecommendations().subscribe(res => {
      this.years = res['DATA'];
      console.log(res);
    })
  }

  longRecommendationsMonth($event) {
    console.log($event);
    $('#selectMonth').prop("disabled", false);
    this.apiProvider.longRecommendationsMonth($event).subscribe(res => {
      this.months = res['MONTHS'];
      console.log(res);
    })
  }

  longRecommendationsDay($event) {
    console.log($event);
    if($event.length == 1)
      $event = this.year + "-0" + $event;
    else
      $event = this.year + "-" + $event;

    this.apiProvider.longRecommendationsDay($event, 0).subscribe(res => {
      console.log(res);
      if(res['STATUS'] == 1){
        $('#result').show();
        this.data.average_profit = res['average_profit'];
        this.data.days1 = res['days1'];
        this.data.days2 = res['days2'];
        this.data.days3 = res['days3'];
        this.data.monthName = res['monthName'];
        this.data.recommendations_lose = res['recommendations_lose'];
        this.data.average_profit_per_unit = Math.round(res['average_profit']*100) / 100 *2
        this.longRecom = res['DAYS'];
        console.log(this.data);
      }
    });
  }
}
