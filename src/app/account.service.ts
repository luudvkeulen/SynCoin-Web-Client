import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpService } from './http.service';

@Injectable()
export class AccountService {

  url = 'https://syncoin.luudvankeulen.nl/api/user';

  // url = 'http://localhost:8080/user'

  constructor(
    private http: Http,
    private httpService: HttpService) {
  }

  registerUser(user: JSON): Observable<any> {
    return this.httpService.post('user/register', user, false);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpService.post('user/login', { email, password }, false).map((res: Response) => {
      const token = res.json() && res.json().token;
      if (token) {
        localStorage.setItem('token', JSON.stringify({ token: token }));
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
    }else {
      console.log('Token does not exist.');
      return false;
    }
  }
}
