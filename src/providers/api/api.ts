import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  serverURL = 'http://zplankton.net/beit'

  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('email', email);
      urlSearchParams.append('password', password);
      let body = urlSearchParams.toString()
      console.log(headers);
      this.http.post(this.serverURL + '/api/v1/' + 'auth/login', body, { headers: headers }).
        subscribe(res => {
          console.log(res);
          resolve(res.json())
        }, (err) => {
          reject(err);
        });
    });
  }

  register(name, email, phone, country_id, member_type, package_id, password, stock_type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('name', name);
      urlSearchParams.append('email', email);
      urlSearchParams.append('phone', phone);
      urlSearchParams.append('country_id', country_id);
      urlSearchParams.append('member_type', member_type);
      urlSearchParams.append('package', package_id);
      urlSearchParams.append('password', password);
      urlSearchParams.append('stock_type', stock_type);
      let body = urlSearchParams.toString()
      console.log(headers);
      this.http.post(this.serverURL + '/api/v1/' + 'auth/register', body, { headers: headers }).
        subscribe(res => {
          console.log(res);
          resolve(res.json())
        }, (err) => {
          reject(err);
        });
    });
  }

  freeRegister(name, email, phone) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('name', name);
      urlSearchParams.append('email', email);
      urlSearchParams.append('phone', phone);
      let body = urlSearchParams.toString()
      console.log(headers);
      this.http.post(this.serverURL + '/api/v1/' + 'auth/freeregister', body, { headers: headers }).
        subscribe(res => {
          console.log(res);
          resolve(res.json())
        }, (err) => {
          reject(err);
        });
    });
  }

  registerFormData() {
    return this.http.get(this.serverURL + '/api/' + 'v1/auth/formData').map((res: any) => res.json());
  }


  about() {
    //console.log(this.serverURL+'/api/'+'v1/about');
    return this.http.get(this.serverURL + '/api/' + 'v1/about').map((res: any) => res.json());
  }

  package() {
    return this.http.get(this.serverURL + '/api/' + 'v1/package').map((res: any) => res.json());
  }

  reports() {
    return this.http.get(this.serverURL + '/api/' + 'v1/reports').map((res: any) => res.json());
  }

  recommendations(id) {
    return this.http.get(this.serverURL + '/api/' + 'v1/recommendations?id=' + id).map((res: any) => res.json());
  }

  shortRecommendations() {
    return this.http.get(this.serverURL + '/api/' + 'v1/evaluation/short').map((res: any) => res.json());
  }

  longRecommendations() {
    return this.http.get(this.serverURL + '/api/' + 'v1/evaluation/long').map((res: any) => res.json());
  }

  longRecommendationsMonth(year) {
    return this.http.get(this.serverURL + '/api/' + 'v1/evaluation/long/month?year=' + year).map((res: any) => res.json());
  }

  longRecommendationsDay(month, id) {
    return this.http.get(this.serverURL + '/api/' + 'v1/evaluation/long/day?month=' + month + '&id=' + id).map((res: any) => res.json());
  }

  services() {
    return this.http.get(this.serverURL + '/api/' + 'v1/services').map((res: any) => res.json());
  }

  uploads() {
    return this.http.get(this.serverURL + '/api/' + 'v1/uploads').map((res: any) => res.json());
  }

  contactInfo() {
    return this.http.get(this.serverURL + '/api/' + 'v1/contactInfo').map((res: any) => res.json());
  }

  terms() {
    return this.http.get(this.serverURL + '/api/' + 'v1/terms').map((res: any) => res.json());
  }

  policy() {
    return this.http.get(this.serverURL + '/api/' + 'v1/policy').map((res: any) => res.json());
  }

  respons() {
    return this.http.get(this.serverURL + '/api/' + 'v1/respons').map((res: any) => res.json());
  }

  remainingDays(email) {
    return this.http.get(this.serverURL + '/api/' + 'v1/remaining?email=' + email).map((res: any) => res.json());
  }

}
