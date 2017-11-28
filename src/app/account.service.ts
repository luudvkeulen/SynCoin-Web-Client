import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountService {

  url = 'http://localhost:8080/user';

  constructor(private http: Http) {
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
    return this.http.post(`${this.url}/login`, { email, password }, options).map((res: Response) => {
      const token = res.json() && res.json().token;
      if (token) {
        localStorage.setItem('token', JSON.stringify({ token: token }));
      }
      return res;
    });
  }
}
