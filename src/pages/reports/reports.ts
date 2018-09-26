import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, Platform, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from './../../providers/api/api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import * as $ from "jquery";
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
  providers: [NotificationsProvider]
})
export class ReportsPage {

  reports = []
  loggedIn = "0"
  subscriber = "0"
  constructor(public alert: AlertController, private transfer: FileTransfer, private file: File, public menu: MenuController,
    public loadingCtrl: LoadingController, public apiProvider: ApiProvider, public navCtrl: NavController,
    public navParams: NavParams, private platform: Platform, private _notificationService: NotificationsProvider) {
    this.getReports();
    this.loggedIn = localStorage.getItem('loggedIn');
    this.subscriber = localStorage.getItem('subscriber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
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
          fileTransfer.download('http://beitelmal.com/public/reports-files/' + file, 'file:///storage/emulated/0/Downloads/' + file).then((success) => {
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

  openMenu(){
    this.menu.open();
  }

  getReports() {
    let loading = this.loadingCtrl.create({
      spinner: "bubbles"
    });
    loading.present();
    this.apiProvider.reports().subscribe(res => {
      console.log(res);
      if (res['STATUS'] == 1) {
        this.reports = res['REPORTS']['data'];
      }
      loading.dismiss();
    });
  }


}
