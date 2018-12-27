import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ApiProvider } from './../../providers/api/api';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the RecommendationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html',
  providers: [NotificationsProvider]
})
export class RecommendationsPage {

  loggedIn = "0";
  subscriber = "0";
  recentPublicRecommendations = []
  constructor(public alert: AlertController, private transfer: FileTransfer, private file: File,
    public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public menu: MenuController,
    public loadingCtrl: LoadingController, private _notificationService: NotificationsProvider, public platform: Platform) {
    this.publicRecommendations();
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendationsPage');
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

  publicRecommendations() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.uploads().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.recentPublicRecommendations = res['UPLOADS'];
        console.log(this.recentPublicRecommendations);
        loading.dismiss();
      }
    })
  }

  askForDownload(file) {
    let download = this.alert.create({
      title: 'تحميل الملف',
      message: "هل ترغب في تحميل هذا الملف ؟",
      buttons: [{
        text: 'نعم',
        handler: data => {
          loading.present();
          const fileTransfer: FileTransferObject = this.transfer.create();
          if(this.platform.is('android')) {
        		this.file.checkDir(this.file.dataDirectory, 'Downloads').then(response => {
        			console.log('Directory exists'+response);
        		}).catch(err => {
        			console.log('Directory doesn\'t exist'+JSON.stringify(err));
        			this.file.createDir(this.file.dataDirectory, 'Downloads', false).then(response => {
        				console.log('Directory create'+response);
        			}).catch(err => {
        				console.log('Directory no create'+JSON.stringify(err));
        			});
        		});
        	}
          fileTransfer.download('http://zplankton.net/beit/public/uploads-files/' + encodeURI(file), 'file:///storage/emulated/0/Downloads/' + file).then((success) => {
            alert("تم تحميل الملف بنجاح");
            loading.dismiss();
          }).catch((err) => {
            loading.dismiss();
            // alert(err);
            alert('فشل تحميل الملف');
          });
        }
      },
      {
        text: 'لا',
        role: 'cancel'
      }
      ],
    })
    download.present()
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });
  }
}
