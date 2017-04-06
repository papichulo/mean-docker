import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { User } from '../model/user';

import 'rxjs/add/operator/map';
import { Post } from '../model/post';

@Injectable()
export class PostService {

  API = 'http://localhost:3000';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  // TODO add user id.
  addBlogPost(title, content, tags): Observable<any> {
    var userJson = localStorage.getItem('user');
    var user = new User().deserialize(userJson);
    var user_id = user._id;

    return this.authHttp.post(`${this.API}/posts`, {title, content, tags, user_id})
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      })
  }

  getAllPosts():Observable<Post[]> {
    return this.http.get(`${this.API}/posts`)
      .map(res => res.json())
      .catch(err => {
        return Observable.throw(err);
      })
  }
}
