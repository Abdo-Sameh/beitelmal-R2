import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {
  serverURL = 'http://beitelmal.com/api/v1/notification/'

  constructor(public http: HttpClient) {
  }

  addUserToken = (user_id , device_id) :Observable<any> => {
     return this.http.post(this.serverURL+"set",{'user_id':user_id ,'device_id':device_id});
  }

  getUserToken = (user_id)  :Observable<any> =>{
     return  this.http.get(this.serverURL+"get?user_id="+user_id);
  }

  deleteUserToken = (user_id)  :Observable<any> =>{
     return this.http.delete(this.serverURL+"delete?user_id="+user_id);
  }
}
