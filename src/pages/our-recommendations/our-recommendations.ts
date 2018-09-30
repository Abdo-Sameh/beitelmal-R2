import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactUsPage } from '../contact-us/contact-us';
import { LongRecommendationsPage } from '../long-recommendations/long-recommendations';
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
  package
  constructor(public loadingCtrl: LoadingController, public apiProvider: ApiProvider, public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams, private _notificationService: NotificationsProvider, public menu: MenuController) {
    // this.ourRecommendations();
    this.getAllSectors();
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = JSON.parse(localStorage.getItem('subscriber'));
    this.package = JSON.parse(localStorage.getItem('package'));

    if (this.package == '11') {
      let alert = this.alertCtrl.create({
        title: 'اشتراكك مجانى',
        message: 'باقتك المجانية تتيح لك استعراض توصية واحدة',
        buttons: [
          {
            text: 'موافق',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'طلب ترقية الباقة',
            handler: () => {
              console.log('Buy clicked');
              this.navCtrl.push(ContactUsPage).then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
              });
            }
          }
        ]
      });
      alert.present();
    }

    if (this.subscriber != '1') {
      let alert = this.alertCtrl.create({
        title: 'اشتراكك غير صالح',
        message: 'رجاء التأكد من صلاحية اشتراكك بالباقة المدفوعة',
        buttons: [
          {
            text: 'التوصيات المغلقة',
            handler: () => {
              console.log('Cancel clicked');
              this.navCtrl.push(LongRecommendationsPage).then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
              });
            }
          },
          {
            text: 'تواصل معنا',
            handler: () => {
              console.log('Buy clicked');
              this.navCtrl.push(ContactUsPage).then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
              });
            }
          }
        ]
      });
      alert.present();
    }
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

  openMenu() {
    this.menu.open();
  }

  getAllSectors() {
    this.apiProvider.sectors().subscribe(res => {
      console.log(res);
      this.sectors = res['SECTORS'];
    })
  }

  ourRecommendations() {
    this.recentOurRecommendations = [];
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();//recommendations(id, rec_type, stock_type_id, sector_id)
    if(this.package == '11'){
      if(this.rec_type != '0'){
        this.rec_type = "";
      }
    }
    console.log(localStorage.getItem('id'), this.rec_type, this.stock_type_id, this.sector_id);
    this.apiProvider.recommendations(localStorage.getItem('id'), this.rec_type, this.stock_type_id, this.sector_id).subscribe(res => {
      if (res['STATUS'] == 1) {
        this.recentOurRecommendations = res['RECOMMENDATIONS']['data'].slice(0, 1);
        console.log(this.recentOurRecommendations);
        loading.dismiss();
      } else {
        this.recentOurRecommendations = []
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
