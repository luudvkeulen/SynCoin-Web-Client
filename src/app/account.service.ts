import {Injectable, isDevMode} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountService {

  url = 'https://syncoin.luudvankeulen.nl/api/user';

  constructor(private http: Http) {
    if (isDevMode()) {
      this.url = 'http://localhost:8080/user';
    }
  }

  registerUser(user: JSON): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url + '/register', user, options).map((res: Response) => {
      if (res) {
        console.log('Status :' + res.status);
      }
      console.log('No res');
    });
  }

  login(email: string, password: string): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.url}/login`, {email, password}, options).map((res: Response) => {
      const token = res.json() && res.json().token;
      if (token) {
        localStorage.setItem('token', JSON.stringify({token: token}));
      }
      return res;
    });
  }

  logout(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      localStorage.removeItem('token');
      console.log('Token removed');
      return true;
    } else {
      console.log('Token does not exist.');
      return false;
    }
  }
}
