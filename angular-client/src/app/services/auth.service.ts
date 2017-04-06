import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { User } from '../model/user';

@Injectable()
export class AuthService {

    API = 'http://localhost:3000';
    
    constructor(private http: Http, private authHttp: AuthHttp) { }

    getUser(id): Observable<User> {
      return this.authHttp.get(`${this.API}/user`, {params: {id: id}})
        .map(res => res.json()).catch(err => {
          this.notify(err.statusText);
          return Observable.throw(err);
        })
    }

  addUser(name, password, admin): Observable<any> {
    return this.authHttp.post(`${this.API}/user`, {name, password, admin})
      .map(res => res.json())
      .catch(err => {
        this.notify(err.statusText);
        return Observable.throw(err);
      })
  }

  saveUser(id, name, password, admin): Observable<any> {
    return this.authHttp.post(`${this.API}/user`, {id, name, password, admin})
      .map(res => res.json())
      .catch(err => {
        this.notify(err.statusText);
        return Observable.throw(err);
      })
  }

  deleteUser(id): Observable<any> {
    return this.authHttp.delete(`${this.API}/user`, {params: {id: id}})
      .map(res => res.json())
      .catch(err => {
        this.notify(err.statusText);
        return Observable.throw(err);
      })
  }

  getAllUsers():Observable<User[]> {
    return this.authHttp.get(`${this.API}/users`)
      .map(res => res.json()).catch(err => {
        this.notify(err.statusText);
        return Observable.throw(err);
      })
  }

  authenticate(name, password): Observable<any> {
    return this.http.post(`${this.API}/authenticate`, {name, password})
      .map(res => res.json())
      .catch(err => {
        this.notify(err.message);
        return Observable.throw(err);
      })
  }

  notify(text: any) {
    // TODO display message to user.
    console.log('notify', text);
  }
}